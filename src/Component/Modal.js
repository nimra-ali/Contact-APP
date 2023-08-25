// import React, { useState, useEffect} from 'react'
// import './Multiple.css'
// import { addDoc, collection , query, where, getDocs } from 'firebase/firestore'
// import { auth, db } from './Firebase'

// // function Modal({ closeModal, contactData, contactState, contactList }) {
//     function Modal({ closeModal}) {

//     const [usersData, setUsersData] = useState([])
//     const [modal, setModal] = useState(false)
//     const [contact, setContact] = useState([])
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         address: "",
//         contact: "",
//     })
    
//     useEffect(() => {
//         const user = auth.currentUser;
//         setUsersData(user)
//     })
//         const  handleSubmit = async () => {
            
//         setModal(false);

//         const docRef = await addDoc(collection(db, 'contact'), {
//             name: formData.name,
//             email: formData.email,
//             contact: formData.contact,
//             address: formData.address,
//             usersData: usersData.uid
//         })
//         setFormData(docRef)
//         console.log(formData.name)  
//         console.log(formData.address)
//         console.log(usersData.uid)
//         console.log(docRef)
        
    
    
    
    
//     }
        
//         // contactData([...contactList, {docRef}])
//         // debugger; 
    
//     useEffect(() => {
//         const getDataByQuery = async () => {
//             if (!usersData){
//                 return;
//             }
//             try{
//                 const collectionRef = collection(db, 'contact');
//                         const qu = query(collectionRef, where('userData', '==', usersData.uid));
//                         const querySnapshot = await getDocs(qu);
                        
//                         const contactData = [];
//                         querySnapshot.forEach((doc) => {
//                             const contact = {
//                                 id: doc.id,
//                                 ...doc.data()
//                             };
//                             console.log(doc.id)
//                             contactData.push(contact);
//                         });
//                         // console.log(contactData)
//                         setContact(contactData);
//                     } catch (error) {
//                         console.error("error fetch contact" , error)
//                     }
//          };
//          getDataByQuery(formData);
// },[formData])



//     return (
//         <div className='modal-background'>
//             <div className='modal-container'>
//                 <div class="form-container">
//                     <button className='x-btn' onClick={() => closeModal(false)}>X</button>
//                     <h1 class="form-title"><i>Add your contact</i></h1>
//                     <form className='from1' action="#" method="post">
//                         <div class="form-group">
//                             <label for="name" class="form-label">Name</label>
//                             <input type="text" id="name" name="name" value={formData.name}
//                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
//                         </div>
//                         <div class="form-group">
//                             <label for="email" class="form-label">Email</label>
//                             <input type="email" id="email" name="email" value={formData.email}
//                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" required />
//                         </div>
//                         <div class="form-group">
//                             <label for="contact" class="form-label">Contact</label>
//                             <input type='num' id="contact" name="contact" value={formData.contact}
//                                 onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="form-input" required />
//                         </div>
//                         <div class="form-group">
//                             <label for="address" class="form-label" >Address</label>
//                             <input id="address" name="address" value={formData.address}
//                                 onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="form-input" />
//                         </div>
//                         <button type="button" class="form-button" onClick={handleSubmit}>submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Modal;
import React from 'react'
import './Multiple.css'
import {GiCrossedSabres} from 'react-icons/gi'
// import { createPortal } from 'react-dom'
function Modal({onClose,isOpen,children}) {
  return (
     <> 
     {isOpen && <div className='model'> 
    <>
    <div className='cross-div'>
     <GiCrossedSabres className='cross' onClick={onClose}/>
     </div>
     {children}
     <div className='self-div' onClick={onClose}/>
    </>
     </div>} 
     </>
)
}

export default Modal

























