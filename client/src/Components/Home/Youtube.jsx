import React from 'react'
import ReactPlayer from 'react-player/youtube'

const Youtube = ({url}) => {
  return (
   <ReactPlayer url={url}/>
  )
}

export default Youtube