import React, { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-hot-toast";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .then(() => {
        toast.success("Contact successfully deleted!");
      })
      .catch(() => {
        toast.error("An error occurred while deleting the contact.");
      });
    setShowModal(false);
  };

  return (
    <>
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
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </li>

      <DeleteConfirmation
        show={showModal}
        onClose={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Contact;
