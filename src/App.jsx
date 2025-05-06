import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { fetchContacts } from './redux/contactsOps';
import { selectLoading, selectError } from './redux/contactsSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default App;