import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { app } from '../../firebase-config'


import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import '../../index.css'
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    const handleAction = () => {
        const authentication = getAuth();

        sendPasswordResetEmail(authentication, email)
            .then((response) => {
                toast.success("If we found your account, we'll send a reset email.");
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })

    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/profile')
        }
    }, [])

    return (
        <>
            <div className="container toast">
                <div className="heading-container">
                    <h3>
                        Please enter email.
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
                        label="Enter Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Button variant="contained" onClick={handleAction}>Send Reset Email</Button>
            </div>
        </>
    );
}