import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Footer from '../component/Footer'

export default function layout({children}) {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar></Navbar>
        <main className='flex-grow'>
            {children}
        </main>
        <Footer></Footer>
    </div>
  )
}
