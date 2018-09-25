import React from 'react'

const WelcomePage = () => {
  return(
    <div>
      <figure className="court-image-container">
        <div className="image-overlay"></div>
        <img src="https://images-cdn.torchx.com/property-images/19/2018-07-21t11:44/1820-avenida-del-mundo-1408-coronado_180040070-23-full.jpg" className="courts-img" />
      </figure>
      <div className="welcome-container">
        <h1 className="welcome-text">
          Welcome to our tennis store site!
        </h1>
      </div>
      <div className="bottom-container">
        <ul>
          <li>
            <img src={window.whiteRacketURL} />
            <div className="keynotes">
              <h2>Check the status of your orders</h2>
              <h3>Get updates on your rackets.</h3>
            </div>
          </li>
          <li>
            <i className="fas fa-store-alt"></i>
            <div className="keynotes">
              <h2>Check what's new</h2>
              <h3>Our new arrivals!</h3>
            </div>
          </li>
          <li>
            <i className="fas fa-edit"></i>
            <div className="keynotes">
              <h2>Look up previous orders</h2>
              <h3>See what you have order and compare</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default WelcomePage;
