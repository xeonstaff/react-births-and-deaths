import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase-config'

export default function Profile() {
    let navigate = useNavigate();

    const auth = getAuth();
    let email = auth.currentUser.email

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/profile')
        }

        if (!authToken) {
            navigate('/signin')
        }
    }, [])
    return (
        <>
            <div className='container'>
                You're Now Signed In as <b>{email}</b>.
                <div className='textin'>
                    <Link to='/updateprofile'>Update Profile</Link>
                </div>
            </div>
        </>
    )
}
