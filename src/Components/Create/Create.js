import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';

const Create = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!user) {
      alert('Please log in before submitting.');
      return;
    }

    if (!name || !category || !price || !image) {
      alert('Please fill out all required fields.');
      return;
    }

    if (image && !image.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      alert('Select a Valid Image');
      return;
    }

    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          const currentDate = new Date();
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: currentDate.toDateString(),
          });
          history.push('/');
        });
      })
      .catch((err) => {
        setError('An error occurred while uploading the image.');
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
        </form>
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        ></img>
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </Fragment>
  );
};

export default Create;
