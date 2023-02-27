import React from 'react'
import { AiFillLinkedin,AiFillInstagram,AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div  className='footer-container' >
      <p>2022 JULIUS ALL RIGHTS RESERVED</p>
      <p  className='icons' >
        <AiFillInstagram />
        <AiFillLinkedin />
        <AiOutlineTwitter />
      </p>
      
  </div>
  )
}

export default Footer