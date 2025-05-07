import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

// Початковий стан
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null, // Додаємо поле для помилки
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null; // очищуємо помилку після успішної реєстрації
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null; // очищуємо помилку після успішного логіну
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null; // очищуємо помилку після логауту
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null; // очищуємо помилку під час запиту на оновлення
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null; // очищуємо помилку після успішного оновлення користувача
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || 'Failed to refresh user data'; // Зберігаємо помилку
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || 'Failed to register'; // Зберігаємо помилку
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Failed to login'; // Зберігаємо помилку
      });
  },
});

export default authSlice.reducer;