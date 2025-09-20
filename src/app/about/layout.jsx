import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Footer from './AboutFooter'
import HeadlineMarquee from './Marque'
import FooterLast from './FooterLast'


export default function layout({children}) {
  return (
    <div className='min-h-screen flex flex-col overflow-hidden '>
        <Navbar></Navbar>
        <main className='flex-grow'>
            {children}
        </main>
        <Footer></Footer>
        <HeadlineMarquee></HeadlineMarquee>
        {/* <FooterLast></FooterLast> */}
    </div>
  )
}
