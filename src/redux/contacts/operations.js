import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global/contacts';

const cleanPhoneNumber = (number) => {
  const cleaned = number.replace(/[^\d\s\-()+]/g, '');
  const digits = cleaned.replace(/\D/g, '');
  if (digits.length < 10 || cleaned.length > 25) {
    return null;
  }
  return cleaned;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const cleanedContacts = response.data
        .map((contact) => {
          const cleaned = cleanPhoneNumber(contact.number);
          return cleaned ? { ...contact, number: cleaned } : null;
        })
        .filter(Boolean);
      return cleanedContacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const cleanedNumber = cleanPhoneNumber(contact.number);
      if (!cleanedNumber) throw new Error('Invalid phone number format');
      const response = await axios.post(API_URL, {
        name: contact.name,
        number: cleanedNumber,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);