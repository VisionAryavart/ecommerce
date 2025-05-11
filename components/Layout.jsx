import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

// is importing the Head component from Next.js. This component allows you to modify the <head> section of your HTML document from within a specific page or component.

// Purpose:
// You use <Head> to set things like:

// <title> (page title)

// <meta> tags (description, viewport, keywords, etc.)

// <link> tags (e.g., for favicons or fonts)

// Other head elements like <script> if needed

const Layout = ({ children }) => {
  return (
    <div className='layout'><Head>
      <title>
        The Fitness Store
      </title>
      </Head>
      <header>
        <Navbar/>
      </header>
      
      <main className='main-container'>{children}
      </main>
      <footer>
        <Footer/>
      </footer>
      </div>
  )
}

export default Layout