import React from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = ({ contact, onDelete }) => {
  return (
    <li className={styles.contact}>
      <div className={styles.contactInfo}>
        <div className={styles.contactDetails}>
          <FaUser className={styles.icon} />
          <span>{contact.name}</span>
        </div>
        <div className={styles.contactDetails}>
          <FaPhoneAlt className={styles.icon} />
          <span>{contact.number}</span>
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(contact.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
