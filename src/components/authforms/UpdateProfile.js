import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { app } from '../../firebase-config'

import { getAuth, updateEmail, updatePassword, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'

export default function UpdateProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    const authentication = getAuth();

    const handlePassword = () => {
        updatePassword(authentication.currentUser, password)
            .then((response) => {
                toast.success('Password successfully Updated!');
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Please check password!');
                }
            })
    }

    const handleEmail = () => {
        updateEmail(authentication.currentUser, email)
            .then((response) => {
                toast.success('Email Successfully Updated!');
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email Already in Use');
                }
            })
            .catch((error) => {
                toast.error('Please check Email!');

            })
    }

    const handleDelete = () => {
        deleteUser(authentication.currentUser)
            .then((response) => {
                toast.success('Account is gone!');
                sessionStorage.removeItem('Auth Token');
                navigate('/births')
            })
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/updateprofile')
        }
    }, [])

    return (
        <>
            <div className="container toast">
                <div className="heading-container">
                    <h3>
                        Update Profile
                    </h3>
                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="email"
                        label="Enter New Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleEmail}>Update Email</Button>
                    <TextField
                        type="password"
                        id="outlined-password-input"
                        label="Enter New Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handlePassword}>Update Password</Button>
                </Box>
                <Button variant="contained" onClick={handleDelete}>Delete Account</Button>
            </div>
        </>
    );
}