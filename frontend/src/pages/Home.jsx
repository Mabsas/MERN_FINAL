import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import styles from '../css/Home.module.css'; // Import the CSS module

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>The Story Shelf</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className={styles.addButton} />
                </Link>
            </div>
            {loading ? (<Spinner />
            ) : (<table className={styles.table}>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md '>No</th>
                        <th className='border border-slate-600 rounded-md '>Title</th>
                        <th className='border border-slate-600 rounded-md max-md-hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md-hidden'>Publish Year</th>
                        <th className='border border-slate-600 rounded-md '>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {book.title}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.author}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.publishYear}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className={styles.operations}>
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className={`${styles.icon} ${styles.info}`} />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className={`${styles.icon} ${styles.edit}`} />
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <MdOutlineDelete className={`${styles.icon} ${styles.delete}`} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default Home;
