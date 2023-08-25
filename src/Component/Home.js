 

import { FiSearch } from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai';

import { useState, useEffect } from 'react';
import {auth, db } from './Firebase';
import { addDoc, collection,getDocs, query, where } from 'firebase/firestore';
import Navbar  from './Navbar'
import Contactcard from './Contactcard';
import './Multiple.css'
import Modal from '../Component/Modal';
// import {user} from '../signUp/SignUp'


function Home() {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    userId: '',
  });

  const [contact, setContact] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userName, setUserName] = useState('');
  const [modal, setModal] = useState(true);
  // const [ userData , setuserData] = useState([])
// console.log(userData,'data')
// const [loading, setLoading] = useState(true);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName('');
      }
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);
    if (!formValue.name || !formValue.email || !formValue.address || !formValue.phone) {
      alert('Please fill all fields');
      return;
    }
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      const contactRef = await addDoc(collection(db, 'contact'), {
        name: formValue.name,
        email: formValue.email,
        address: formValue.address,
        phone: formValue.phone,
        userId: uid,
      });
      console.log(contactRef, 'saved');
      setContact((prevContacts) => [
        ...prevContacts,
        {
          id: contactRef.id,
          name: formValue.name,
          email: formValue.email,
          address: formValue.address,
          phone: formValue.phone,
          userId: uid,
        },
      ]);
      // debugger;
      console.log(uid)
      // console.log(formValue.name)
      setFormValue({
        name: '',
        email: '',
        address: '',
        phone: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.uid) {
      const uid = user.uid;
      const getDataByQuery = async () => {
        const collectionRef = collection(db, 'contact');
        const qu = query(collectionRef, where('usersId', '==', uid));
        const querySnapshot = await getDocs(qu);
        const contactData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContact(contactData);
        // setLoading(false); // Set loading to false after data fetch
      };
      getDataByQuery();
    }
  }, []);
  
  // Render loading state if data is still loading
  // if (loading) {
    // return <div>Loading...</div>;
  // }
  
  
  
    return (
      <div className='big'>
        <div className='elder'>
          <div className='nav'>
  
            <span>{`Welcome ${displayName}`}</span>
          <h1 className='log' > <a href='/login'>Logout</a></h1>
          </div>
          {/* <h1> <a href='/login'>Logout</a></h1> */}
          {/* <i><p>⁓⁓~Happily SignUp/Login~⁓⁓</p></i> */}
          <br />
          <br />
        </div>
  
        <div className="app">
       <Navbar/>
  <div className=' input-tag'>
        <input type='text' className='input' />
       <FiSearch className='icon'/>
       < AiFillPlusCircle onClick={onOpen} className='plus'/>
      </div>
      <div className='main-contact'>
        {contact?.map((contact)=>{
          return(
  
            // <Contactcard key={contact.id} contact={contact}/>
            <Contactcard key={contact.name} contact={contact}/>
          
          )
        })}
      </div>
       </div>
  
        <Modal isOpen={isOpen} onClose={onClose}>
        <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form  className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValue.name}
            onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
            required
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValue.email}
            onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
            required
          />
  

        
  
          <label htmlFor="message">Address:</label>
          <textarea
            id="message"
            name="message"
            value={formValue.address}
            onChange={(e) => setFormValue({ ...formValue, address: e.target.value })}
            rows="2"
            required
          />
  
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formValue.phone}
            onChange={(e) => setFormValue({ ...formValue, phone: e.target.value })}
            required
          />
  
          <button type="button" className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
        </Modal>
      </div>
    );
  }
  
  export default Home;
























