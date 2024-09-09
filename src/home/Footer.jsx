import React from 'react'
import { icon } from '../utility/icon';
const Footer = ({setProbOpen}) => {
  
  return (
    <div className='footer-container'>
    <div className='footer'>
        <div className="footer-left">
            <p className='this'>This game is</p>
         <div className="footer-left-1"  onClick={()=>setProbOpen(true)}>
         <img src={icon.fair} alt="" className='prov-img' />
         <p className='prov'>Provably Fair</p>
         </div>
        </div>
        <div className="footer-left">   
            {/* <p className='this'>Powered by</p> */}
            {/* <Link to="https://spribe.co/welcome" target='_blank' className='spribe' >
            spribe
            </Link> */}
        </div>
    </div>
</div>
  )
}

export default Footer