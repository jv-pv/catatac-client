import React from 'react'

const Footer = () => {
  return (
    <div className='text-black flex items-center justify-between font-headerFont'>
        <div className='flex gap-2'>
            <a href="https://www.instagram.com/catatac.art/" target='_blank'>
                <img src="/svg/instagram.svg" alt="instagram"  className=''/>
            </a>
            <a href="https://www.instagram.com/catatac.art/" target='_blank'>
                <img src="/svg/facebook.svg" alt="facebook" />
            </a>
            <a href="https://www.linkedin.com/in/catalina-pieri-52a6b55b/" target='_blank'>
                <img src="/svg/linkedin.svg" alt="facebook" />
            </a>
        </div>
            <a href="mailto:cbpieri@gmail.com" title='Email me!'>cbpieri@gmail.com</a>
    </div>
  )
}

export default Footer