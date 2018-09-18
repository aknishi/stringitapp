import React from 'react'

const WelcomePage = () => {
  return(
    <div className="body">
      <figure className="image-container">
        <div className="overlay"></div>
        <img src="http://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SANDICOR/180019124/19/0/0/71c9bd96c6ff83fbfe8cf1de1a66fbca/1/0bea7bf626748fd210b40d0d6d0304b0/180019124-19.JPG" className="courts-img" />
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
