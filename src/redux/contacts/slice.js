import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Завантаження контактів
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null; // очищуємо помилку перед завантаженням
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch contacts'; // зберігаємо помилку
      })
      
      // Додавання контакту
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null; // очищуємо помилку перед додаванням
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add contact'; // зберігаємо помилку
      })
      
      // Видалення контакту
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null; // очищуємо помилку перед видаленням
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete contact'; // зберігаємо помилку
      });
  },
});

export default contactsSlice.reducer;