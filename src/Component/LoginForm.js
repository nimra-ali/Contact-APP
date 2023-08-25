   import React ,{useState} from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
// import SignupForm from './SignupForm';.

function LoginForm() {
  
  

    const [values, setValues] = useState({
      email: '',
      password: ''
    });
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [submitButton, setSubmitButton] = useState(false)
    //   const [formData, setFormData] = useState({
    //     fullName: '',
    //     email: '',
    //     password: '',
    //   });
  
    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       [name]: value,
    //     }));
    //   };
  
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform form submission or validation here
    //     console.log(formData);
    //   };
    const handleSubmission = (e) => {
      e.preventDefault();
      if (!values.email || !values.password) {
        setErrorMsg('Fill all fields')
        return;
      }
      setErrorMsg('')
      setSubmitButton(true)
     
      createUserWithEmailAndPassword(auth, values.email, values.password)
      
        .then((response) => {
          const user = response.user;
          setSubmitButton(false);
          // console.log(userRef)
          // console.log(user);
          localStorage.setItem('login' , true)
          navigate("/");
          
        }
        ).catch((err)=>{
          setSubmitButton(false);
          setErrorMsg(err.message)
        })
    }
  
  
    return (
      <div className='login-container'>
        <form className='login-form'>
        <div className="form-group1">
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
          <div className="form-group1">
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
          <p><b className='error'>{errorMsg}</b></p>
          <button type="button" disabled={submitButton} onClick={handleSubmission}>Login</button>
          <p> Already have an account?{""}
            <span>
              <Link to='/signup'>Signup</Link>
            </span>
          </p>
        </form>
  
      </div>
    )
  }
  export default LoginForm;

























