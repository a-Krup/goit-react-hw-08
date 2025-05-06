import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Функція для встановлення заголовка авторизації
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення заголовка авторизації
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Реєстрація
export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/signup', credentials);
    console.log('Register Response:', res.data); // Перевірка відповіді
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    console.error('Register Error:', error.response ? error.response.data : error.message);
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Логін
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/login', credentials);
    console.log('Login Response:', res.data); // Перевірка відповіді
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message);
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Логаут
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    console.error('Logout Error:', error.response ? error.response.data : error.message);
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Оновлення даних користувача
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  // Перевірка на наявність токену
  if (!token) {
    return thunkAPI.rejectWithValue('No token available');
  }

  try {
    setAuthHeader(token);
    const res = await axios.get('/users/current');
    console.log('User Data:', res.data); // Перевірка отриманих даних
    return res.data;
  } catch (error) {
    console.error('Refresh Error:', error.response ? error.response.data : error.message);
    clearAuthHeader(); // Очищаємо заголовок, якщо є проблема
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});