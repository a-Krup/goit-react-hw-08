import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .min(3, "Number must be at least 3 characters")
      .max(50, "Number must be at most 50 characters")
      .required("Number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"), // Додаємо перевірку для email
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "", email: "" }} // Додаємо email до initialValues
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="on">
        <div className={styles.fieldGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field
            name="name"
            type="text"
            id="name"
            placeholder="Name"
            className={styles.input}
            autoComplete="name"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field
            name="number"
            type="text"
            id="number"
            placeholder="Number"
            className={styles.input}
            autoComplete="tel"
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />
        </div>

        {/* Додаємо поле для електронної пошти */}
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Field
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            className={styles.input}
            autoComplete="email"
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;