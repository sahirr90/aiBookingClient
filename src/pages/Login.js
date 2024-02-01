import React from 'react';
import { googleLogo } from '../assets';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/bazarSlice';
import axios from 'axios';
import Video from '../components/Video';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );

        const request = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        axios
          .post('http://localhost:8081/api/v1/customers', request)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            if (e.response && e.response.data) {
              const message = e.response.data;
              console.log(message.msg);
            } else {
              console.error('Error with no response data', e);
            }
          });

        setTimeout(() => {
          navigate('/Home');
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Log Out Successfully!');
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-10 py-20'>
      <div className='w-full flex items-center justify-center gap-10'>
        <div
          onClick={handleGoogleLogin}
          className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400
            rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300'
            style={{ backgroundColor: 'white' }}
        >
          <img className='w-8' src={googleLogo} alt='googleLogo' />
          <span className='text-sm text-gray-900'>Sign in with Google</span>
        </div>

        <button
          onClick={handleSignOut}
          className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300'
        >
          Sign Out
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Video />
      </div>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};

export default Login;
