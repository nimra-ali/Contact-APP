import React, {useState} from 'react'
import deleteContact from './Home'
import { doc, deleteDoc} from 'firebase/firestore'
import { db } from './Firebase'
import './Multiple.css'
function Contactcard() {
  const [contact, setContact] = useState([]);

  const deleteContactcard = async (id) => {
    try {
      await deleteDoc(doc(db, 'contact', id));
      setContact(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.log(error);
    }
  }};
  export default Contactcard;