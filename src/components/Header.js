import React, { useState } from 'react';
import { cart, travel } from '../assets/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


const Header = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [payNow, setPayNow] = useState(false);

  const handleChatAgentLink = (event) => {
    if (!userInfo) {
      event.preventDefault(); // Prevent the default navigation behavior
      toast.error("Please sign in to Chat Agent");
    } else {
      setPayNow(true);
    }
  };
  
  


  return (
    <div className='w-full h-20 bg-white border-b-[0px] border-b-blue-800 font-titleFont sticky top-0 z-50'>
      <div className='max-w-screen-x1 mx-auto px-4 py-2 flex items-center justify-between'>
        <Link to="/">
          <div>
            <img className='w-18 h-14' src={travel} alt='logo' />
          </div>
        </Link>

        <div className='flex items-center gap-8'>
          <ul className='flex items-center gap-8'>
            <li >
            <Link
              className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'
              to='/Home'
              onClick={(event) => handleChatAgentLink(event)}
            >
              Chat Agent {payNow}
            </Link>
            </li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              Support
            </li>
          </ul>

          <Link to='/'>
            <img
              className='w-8 h-8 rounded-full'
              src={
                userInfo
                  ? userInfo.image
                  : 'https://media.istockphoto.com/id/1220827245/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette.jpg?s=612x612&w=0&k=20&c=GMdiPt_h8exnrAQnNo7dIKjwZyYqjH4lRQqV8AOx4QU='
              }
              alt='userLogo'
            />
          </Link>
          {userInfo && (
            <p className='text-base font-titleFont font-semibold underline underline-offset-2'>
              {userInfo.name}
            </p>
          )}
        </div>
        
      </div>
  
    
    </div>
  );
};

export default Header;
