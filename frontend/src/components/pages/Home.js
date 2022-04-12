import React from 'react'
import PowerPicksTextLogo from '../../assets/images/powerpicks_logo.png';
import Auth from '../Auth/Auth';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
      <>
        <div className="container">
            <div className="centeredWrapper">
                <div className="introCopy">
                    <img src={PowerPicksTextLogo} alt="" />
                    <p>Build, manage, and dominate the world in Sports pickems on PowerPickems.</p>
                </div>
                <Auth />
            </div>
        </div>
        <div className="footerContainer">
            <Footer /> 
        </div>
    </>
  )
}

export default Home