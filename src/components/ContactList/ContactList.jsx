import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.contactList}>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
