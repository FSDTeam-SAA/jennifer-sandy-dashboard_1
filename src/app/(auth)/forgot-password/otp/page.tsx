import Image from 'next/image'
import React, { Suspense } from 'react'
import OtpForm from './_components/otp-form'

import authImage  from "../../../../../public/assets/images/auth-new-img.jpeg"
const OtpPage = () => {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='md:col-span-1'>
        <Image src={authImage} alt="Auth Image" width={1000} height={1000} className='object-cover w-full h-screen' />
      </div>
      <div className='md:col-span-1 w-full flex items-center justify-center'>
        <Suspense fallback={<div>Loading...</div>}>
          <OtpForm />
        </Suspense>

      </div>
    </div>)
}
export default OtpPage