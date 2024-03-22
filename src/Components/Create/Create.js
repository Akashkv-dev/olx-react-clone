import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';

import { useNavigate } from 'react-router-dom';
import { FirebaseContext ,AuthContext } from '../../store/FirebaseContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firestore,  storage } from '../../firebase/config';
import  { collection , addDoc } from 'firebase/firestore'


const Create = () => {
  const [name,setName] =useState('')
  const [category, setCategory]= useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState('')
  const [progresspercent, setProgresspercent] = useState(0)
  const date = new Date()


  const onFileUpload = (e) => {
    if (!user) {
      navigate('/login')
    }
    else {
      e.preventDefault()
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url)
            addDoc(collection(firestore, "products"), {
              userId: user.uid,
              name: name,
              category: category,
              price: price,
              image: url,
              createAt: date.toDateString()
            });
            navigate('/');
          });
        }
      );
      
    }
  }

  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={onFileUpload}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname"
            name="Price"
            required
            />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input 
            onChange={(e)=>
              setImage(e.target.files[0])}
            type="file" 
            required/>
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;