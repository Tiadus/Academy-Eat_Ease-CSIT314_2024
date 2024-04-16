import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context';
const LogInSignUp = () => {
    const [state, setState] = useState("Log in");
    // const [customerCode, setCustomerCode] = useState(0)
    const { isAuthenticated, login, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerEmail: '',
        customerName: '',
        customerPhone: '',
        customerPassword: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };
    
    const handleCheckPassword = (e) => { 
        setConfirmPassword(e.target.value);
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.customerPassword !== confirmPassword){
                alert('password mismatched');
                return;
            }
            const response = await axios.post('http://localhost:4000/api/customer/register', formData);
            // console.log('Form data', formData)
            // console.log('New customer code:', response.data);
            setState("Log in");
            alert('register successfully')


        } catch (error) {
            console.error('Error creating customer:', error.message);
        }

        // console.log("Register successfully")
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const customerEmail = formData.customerEmail;
            const customerPassword = formData.customerPassword;
            const unEncode = customerEmail + ":" + customerPassword;
            const auth = btoa(unEncode);
            const headers = {
                authorization: `Basic ${auth}`
            };
            const response = await axios.post('http://localhost:4000/api/customer/login', {}, { headers });

            login(headers.authorization, response.data)
            // setIsAuthenticated(headers.authorization);

            console.log(response.data)
            console.log('New customer code:', response.data.customerCode);
            navigate('/page')

        } catch (error) {
            // alert('Wrong email or password', error.message);
        }
    };

    return (
        <div className='bg-eatEase h-screen pt-[200px]'>
            <div className='flex justify-center'>
                <div className="bg-gray-300 flex flex-col  items-center w-[600px] h-[600px] rounded-xl">
                    <p className='text-4xl m-[50px]'>{state}</p>
                    <form className=" flex flex-col gap-4 w-3/5 items-center" >
                        <input className='h-[50px] w-full rounded-xl p-5' name='customerEmail' type="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                        {state === "Sign up" &&
                            <>
                                <input className='h-[50px] w-full rounded-xl p-5' name='customerName' type="text" placeholder='Name' value={formData.name} onChange={handleChange} />
                                <input className='h-[50px] w-full rounded-xl p-5' name='customerPhone' type="tel" placeholder='Phone number' value={formData.phone} onChange={handleChange} />
                            </>
                        }
                        <input className='h-[50px] w-full rounded-xl p-5' name='customerPassword' type="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                        {state === "Sign up" && <>
                            <input className='h-[50px] w-full rounded-xl p-5' name='customerConfirmPassword' type="password" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleCheckPassword} />
                        </>}
                        <div onClick={state === "Sign up" ? handleRegisterSubmit : handleLoginSubmit} className=' w-3/5  m-7 text-xl text-center  text-gray-50 rounded-xl p-2 bg-eatEase' >
                            Continue
                        </div>
                    </form>
                    {state === "Sign up" ?
                        <p className="">Already have an account? <span className='text-eatEase font-bold' onClick={() => { setState("Log in") }}>Login</span></p> :
                        <p className="">Create a new account ? <span className='text-eatEase font-bold ' onClick={() => { setState("Sign up") }}>Sign up</span></p>
                    }
                    <div className="flex gap-5 mt-5">
                        <input type="checkbox" name='' id='' />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInSignUp;
