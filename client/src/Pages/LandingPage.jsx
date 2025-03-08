import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { Helmet } from 'react-helmet'

const LandingPage = () => {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Helmet>
        <title>Exam Express | Please Login to explore courses</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      <Navbar />
      <Header />
    </div>
  )
}

export default LandingPage