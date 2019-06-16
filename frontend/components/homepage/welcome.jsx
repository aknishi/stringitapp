import React from 'react'
import { Link, withRouter } from 'react-router-dom';

const WelcomePage = () => {
  const services = document.getElementsByClassName("keynotes__item service-anim")
  let n = 1
  setInterval(() => {
    if (n == services.length) n = 0
    for (let i = 0; i < services.length; i++) {
      if (i == n) {
        services[i].style.display = "flex";
      } else {
        services[i].style.display = "none";
      }
    }
    n++
  }, 4000)

  function getScrollTop() {
    return document.documentElement.scrollTop;
  }
  return (
    <div className="homepage">
      <div className="court-image"></div>
      <div className="welcome">
        <h1 className="welcome__text welcome-anim">
          Welcome to String It App!
        </h1>
      </div>
      <section>
        <ul className="keynotes">
          <li className="keynotes__item service-anim">
            <img src={window.grayRacketURL} />
            <div className="keynotes__text">
              <h2>Manage stringing racket orders</h2>
              <h3>Receive order status notifications of your orders</h3>
            </div>
          </li>
          <li className="keynotes__item service-anim">
            <img src={window.shopURL} />
            <div className="keynotes__text">
              <h2>Check out the store</h2>
              <h3>See what's new</h3>
            </div>
          </li>
          <li className="keynotes__item service-anim">
            <img src={window.orderURL} />
            <div className="keynotes__text">
              <h2>Look up previous orders</h2>
              <h3>Compare your previous orders strings and tensions</h3>
              <h3>and improve your game on the court</h3>
            </div>
          </li>
        </ul>
      </section>
      <section className="features">
        <img className="graph" src={window.graphURL} />
        <div className="keynotes__text">
          <h2>Analize your gameplay</h2>
          <h3>Gather data from previous orders</h3>
          <h3>to improve your game at the court.</h3>
        </div>
      </section>
      <div className="tennis-play-image"></div>
      <section className="features">
        <img src={window.userShareURL} />
        <div className="keynotes__text">
          <h2>Exchange information with other users</h2>
          <h3>Work together to improve your game</h3>
          <h3>and get tips from the experts</h3>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-section">
          <div>
            <Link to="/" className="logo-link">
              <img className="footer-logo" src={window.logoURL}></img>
            </Link>
          </div>
          <h6>by Adrian Kawanishi</h6>
          <h6>© 2019</h6>
        </div>
        <div className="footer-section">
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-section">
          <a href="#">Site Map</a>
          <a href="#">Directions</a>
          <a href="#">Store Hours</a>
        </div>
        <div className="footer-section">
          <h6>Follow Us</h6>
          <div className="footer-icons">
            <a href="#" className="fa fa-facebook-square"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-github"></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage;
