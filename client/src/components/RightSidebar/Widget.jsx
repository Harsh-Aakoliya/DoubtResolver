import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/message.png'
import pen from '../../assets/pen.png'


const Widget = () => {
  return (
    <div className='widget'>
        <h4> The overflow Blog</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt='pen' width='18'/>
                <p>this is first line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt='pen' width='18'/>
                <p>this is second line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
        </div>

        <h4> Featured on Meta</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt='comment' width='18'/>
                <p>this is first line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt='comment' width='18'/>
                <p>this is first line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt='comment' width='18'/>
                <p>this is third line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
        </div>

        <h4> How meta posts</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <p>38</p>
                <p>this is first line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>38</p>
                <p>this is second line this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>38</p>
                <p>this is third linglajsdflasjdf;laksjdf;lakjsdf;lkajsd</p>
            </div>
        </div>

    </div>
  )
}

export default Widget