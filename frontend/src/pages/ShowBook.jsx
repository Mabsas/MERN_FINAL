import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import styles from '../css/ShowBook.module.css'; // Import the CSS module

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.header}>
        <h1 className={styles.title}>About Book</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.detailsContainer}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Id:</span>
            <span className={styles.detailValue}>{book._id}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Title:</span>
            <span className={styles.detailValue}>{book.title}</span>
          </div>
          <div className={styles.imageContainer}>
            <span className={styles.detailLabel}>Picture:</span>
            <img src={book.pictureURL} alt={book.title} className={styles.image} />
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Author:</span>
            <span className={styles.detailValue}>{book.author}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Publish Year:</span>
            <span className={styles.detailValue}>{book.publishYear}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Description:</span>
            <span className={styles.detailValue}>{book.description}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Price:</span>
            <span className={styles.detailValue}>{book.price}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Added:</span>
            <span className={styles.detailValue}>{new Date(book.createdAt).toDateString()}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Last Update:</span>
            <span className={styles.detailValue}>{new Date(book.updatedAt).toDateString()}</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default ShowBook;
