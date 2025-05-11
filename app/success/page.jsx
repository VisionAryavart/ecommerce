'use client'

import React , {useState , useEffect} from 'react'
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import { Router } from 'next/router';
import { useStateContext } from '@/context/StateContext';
import { runFireWorks } from '@/lib/utils';





const Success = () => {

    const {setCartItems , setTotalPrice , setTotalQuantities} = useStateContext();

    useEffect(() => {
     localStorage.clear();
     setCartItems([]);
     setTotalPrice(0);
     setTotalQuantities(0);
     runFireWorks();


    }, [])
    


  return (
    <div className='success-wrapper'><div className='success'>
        <p className='icon'>
              <BsBagCheckFill/>
        </p>
        <h2>Thank You For Your Order</h2>
        <p className='email-msg'>Check your Email address for your receipt</p>
         <p className='description'>
            if you have any question , Please email us
         <a className='email' href='mailto:order@example.com'>mailto:order@example.com</a>
         </p>
         <Link href="/">
          <button type='button' width='300px' className='btn' >
              Continue Shopping
          </button>
         </Link>
        </div></div>
  )
}

export default Success