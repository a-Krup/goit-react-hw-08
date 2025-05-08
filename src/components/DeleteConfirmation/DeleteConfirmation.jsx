import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./DeleteConfirmation.module.css";

const DeleteConfirmation = ({ show, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          Confirm deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        Are you sure you want to delete this contact?
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button
          variant="secondary"
          onClick={onClose}
          className={styles.cancelBtn}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onDelete}
          className={styles.deleteBtn}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
