import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global/contacts';

// Функція для очищення номера телефону
const cleanPhoneNumber = (number) => {
  const cleaned = number.replace(/[^\d\s\-()+]/g, ''); // Очищення від небажаних символів
  const digits = cleaned.replace(/\D/g, ''); // Оставляємо тільки цифри
  if (digits.length < 10 || cleaned.length > 25) {
    return null; // Якщо номер неправильний або дуже короткий/довгий
  }
  return cleaned; // Повертаємо очищений номер
};

// Отримання всіх контактів
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
        .filter(Boolean); // Фільтруємо некоректні контакти
      return cleanedContacts;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error fetching contacts';
      return rejectWithValue(errorMessage); // Детальніша обробка помилок
    }
  }
);

// Додавання нового контакту
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const cleanedNumber = cleanPhoneNumber(contact.number);
      if (!cleanedNumber) throw new Error('Invalid phone number format'); // Перевірка формату номера
      const response = await axios.post(API_URL, {
        name: contact.name,
        number: cleanedNumber,
       
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error adding contact';
      return rejectWithValue(errorMessage); // Детальніша обробка помилок
    }
  }
);

// Видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Повертаємо ID видаленого контакту
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error deleting contact';
      return rejectWithValue(errorMessage); // Детальніша обробка помилок
    }
  }
);