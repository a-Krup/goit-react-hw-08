import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox />
      {loading && <p className={styles.message}>Loading contacts...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;