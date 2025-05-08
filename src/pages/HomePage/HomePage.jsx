import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Phonebook App</h1>
      <p>Please register or log in to manage your contacts.</p>
    </div>
  );
};

export default HomePage;
