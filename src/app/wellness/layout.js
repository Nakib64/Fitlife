import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Footer from '../component/Footer'

export default function layout({children}) {
  return (
    <div>
        <Navbar></Navbar>
        <main>
            {children}
        </main>
        <Footer></Footer>
    </div>
  )
}
