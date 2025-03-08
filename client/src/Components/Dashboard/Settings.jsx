import React from 'react'
import { Helmet } from 'react-helmet'

const Settings = () => {
  return (
    <div>
      <Helmet>
        <title>Settings | Dashboard</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      <h1>Settings</h1>
    </div>
  )
}

export default Settings