import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Births from './components/BirthList'
import Deaths from './components/DeathList'
import SignUp from './components/authforms/SignUp'
import SignIn from './components/authforms/SignIn'
import Profile from './components/authforms/Profile'
import UpdateProfile from './components/authforms/UpdateProfile'
import ResetPassword from './components/authforms/ResetPassword'


const root = ReactDOM.createRoot(
  document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Births />} />
        <Route path="/births" element={<Births />} />
        <Route path="/deaths" element={<Deaths />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
      </Route>
    </Routes>
  </BrowserRouter>
);