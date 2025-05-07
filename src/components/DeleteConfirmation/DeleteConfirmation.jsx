import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './DeleteConfirmation.module.css';

const DeleteConfirmation = ({ show, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Підтвердьте видалення</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        Ви дійсно хочете видалити цей контакт?
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose} className={styles.cancelBtn}>
          Скасувати
        </Button>
        <Button variant="danger" onClick={onDelete} className={styles.deleteBtn}>
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;