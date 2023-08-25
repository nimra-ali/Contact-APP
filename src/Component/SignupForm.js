import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword ,updateProfile } from 'firebase/auth';
import { collection, doc , addDoc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';


const SignupForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [submitButton, setSubmitButton] = useState(false)

  const handleSubmission = (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.password) {
      setErrorMsg('Fill all fields')
      return;
    }
    setErrorMsg('')
    setSubmitButton(true)
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        // console.log(response,'response')
      // const docRef = setDoc(collection(db,'users', user.uid),{
      // email:values.email,
      //   userId: `${response.user.uid}`
      // })
        const user = response.user;
        updateProfile(user,{displayName:values.name})
        // import { doc, setDoc, collection } from "firebase/firestore";

        const saveUserData = async (db, user, userData) => {
          try {
           
            await setDoc(doc(db, "users", user.uid), userData);
            console.log("User data saved successfully!");
          } catch (error) {
            console.error("Error saving user data: ", error);
          }
          // console.log(userData ,'data')
        };
        
         // Call the function
        saveUserData(db, user, values);
        setSubmitButton(false);
        // console.log(user,'usernmae');
        navigate("/"); 
       }
      ).catch((err)=>{
        setSubmitButton(false);
        setErrorMsg(err.message)
      })
    }


  return (
    <div className="signup-container">
      <form className="signup-form" >
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            // value={formData.fullName}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            // value={formData.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))}
            required

          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            // value={formData.password}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))}
            required

          />
        </div>
        <b className='error'>{errorMsg}</b>
        <button type="button" disabled={submitButton} onClick={handleSubmission}>Signup</button>
        <p> Already have an account?{""}
          <span>
            <Link to='/Login'>login</Link>
          </span>
        </p>
      </form>

    </div>

  );
};
export default SignupForm;