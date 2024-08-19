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
  const [description, setDescription] = useState(''); // New state for description
  const [pictureURL, setPictureURL] = useState('');   // New state for picture URL
  const [loading, setLoading] = useState(false);
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
        setDescription(response.data.description); // Populate description
        setPictureURL(response.data.pictureURL);   // Populate picture URL
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
      description,   // Include description in the payload
      pictureURL,    // Include picture URL in the payload
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
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
      <div className={styles.formContainer}>
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
