
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../css/DeleteCreateBook.module.css'; // Import the CSS module

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000); // Show the success message for 3 seconds
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.header}>
        <h1 className={styles.title}>Delete Book</h1>
      </div>
      {loading ? <Spinner /> : ''}
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      <div className={styles.formContainer}>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button
          className={styles.alertButton}
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
