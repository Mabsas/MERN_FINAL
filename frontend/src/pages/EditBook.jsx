import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../css/EditBook.module.css'; // Import the CSS module

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [pictureURL, setPictureURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setPictureURL(response.data.pictureURL);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      price,
      description,
      pictureURL,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Edited successfully!'); // Set success message
        setTimeout(() => {
          setSuccessMessage(''); // Clear message after 3 seconds
          navigate('/');
        }, 3000);
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
        <h1 className={styles.title}>Edit Book</h1>
      </div>
      {loading ? <Spinner /> : ''}
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
      <div className={styles.formContainer}>
        {/* Form fields */}
        <div className={styles.formField}>
          <label className={styles.formLabel}>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Price</label>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Picture URL</label>
          <input
            type='text'
            value={pictureURL}
            onChange={(e) => setPictureURL(e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
