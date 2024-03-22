import React, {useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getDocs,collection, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

function Posts() {
const { firebase }=useContext(FirebaseContext)
const [products, setProducts] =useState([])
const [loading, setLoading] = useState(false);
useEffect(()=>{
  const fetchProducts =async ()=>{
    setLoading(true)
    try {
      const querySnapshot =await getDocs(collection(firestore, 'products'));
      const productsData= []
      querySnapshot.forEach((doc)=>{
        productsData.push({id: doc.id, ...doc.data()});
      });
      setProducts(productsData);
    } catch (error) {
      console.error('error fetching posts',error);
    }
    setLoading(false);
  };
  fetchProducts()
}, []);
  return (
    <div className="postParentDiv">
      {/* <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <div
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          { products.map(product=>{

         return <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createAt}</span>
            </div>
          </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;