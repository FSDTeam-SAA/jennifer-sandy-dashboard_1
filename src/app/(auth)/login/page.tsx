import Image from 'next/image'
import React from 'react'
import LoginForm from './_components/login-form'

import authImage  from "../../../../public/assets/images/auth-new-img.jpeg"
const SignupPage = () => {
    return (
        <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
            <div className='md:col-span-1'>
                <Image src={authImage} alt="Auth Image" width={1000} height={1000} className='object-cover w-full h-screen' />
            </div>
            <div className='md:col-span-1 flex items-center justify-center'>
                <LoginForm />
            </div>
        </div>)
}
export default SignupPage