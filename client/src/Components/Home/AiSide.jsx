import React, { useContext, useState } from 'react'
import '../../Pages/Home.css'
import { AppContext } from '../../Context/AppContext.jsx'
import { assets } from '../../assets/assets.js'
const AISide = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInputAi, inputAi, userData,} = useContext(AppContext);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      onSent();
    }
  };



  return (
    <>
      <div className="inner-ai-side">
        {/* ***************This is retated to the Ai Side Chat Area***************** */}
        {!showResult
        ?(
            <div className="inner-ai-side-page">
              <div className="logo-in-ai">
                <img src={assets.header_png} alt="person Icon" />
              </div>
              <h1 className='flex items-center gsp-2 text-xs sm:text-3xl font-normal mb-2'>
                Hey {userData ? userData.name : 'Students'}!
              </h1>
              <p>Feel Free to ask any question if you're stuck......✨</p>
            </div>
          ) : (
            <div className="result">
              <div className="result-title">
                <img className=' w-6 h-6' src={assets.person_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img className=' w-8 h-8' src={assets.header_png} alt="" />
                {loading
                  ? <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                  : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                }
              </div>
            </div >
          )
        }
      </div >
      {/* ***************Search Input In AI Side******************* */}
      <div className="search-box" >
        <input
          onChange={(e) => setInputAi(e.target.value)}
          value={inputAi}
          onKeyPress={handleKeyPress}
          className='inner-ai-side-page-input focus:outline-none'
          type="text"
          placeholder='Enter Your Query.?'
        />
        <div className='send-icon'>
          <img src={assets.send_icon} alt="send icon" onClick={() => onSent()} />
        </div>
      </div>
    </>
  )
}

export default AISide