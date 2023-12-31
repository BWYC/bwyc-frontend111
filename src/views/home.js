import React from "react";

import { Helmet } from "react-helmet";

import Link from "../components/link";
import "./home.css";
import App1 from "../App";

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>₿wyc</title>
        <meta property="og:title" content="₿wyc" />
      </Helmet>
      <div className="home-navbar">
        <header data-thq="thq-navbar" className="home-navbar-interactive">
          <div className="home-branding">
            <img alt="image" src="/favicon-200h.png" className="home-logo" />
            <span className="home-company">₿WYC</span>
          </div>
          <div className="home-items">
            <div rel="noreferrer noopener" className="home-link">
              <div className="home-links">
                <svg viewBox="0 0 1024 1024" className="home-icon02">
                  <path d="M817.57 348.15c-193.566-143.858-260.266-259.018-305.566-348.148v0c-0.004 0-0.004-0.002-0.004-0.002v0.002c-45.296 89.13-112 204.292-305.566 348.148-330.036 245.286-19.376 587.668 253.758 399.224-17.796 116.93-78.53 202.172-140.208 238.882v37.744h384.032v-37.74c-61.682-36.708-122.41-121.954-140.212-238.884 273.136 188.446 583.8-153.94 253.766-399.226z"></path>
                </svg>
                <a
                  href="https://boredwhalesyachtclub.org/#mint"
                  className="home-text01 nav-link"
                >
                  WHALECARD
                </a>
                <svg
                  viewBox="0 0 760.0274285714286 1024"
                  className="home-icon04"
                >
                  <path d="M666.857 365.714c7.429 76-24.571 121.714-74.857 147.429 83.429 20 136 69.714 125.714 181.143-13.143 138.857-116 176-263.429 184v145.714h-88v-143.429c-22.286 0-45.714 0-69.714-0.571v144h-88v-145.714c-20.571 0-41.143-0.571-62.286-0.571h-114.286l17.714-104.571c64.571 1.143 63.429 0 63.429 0 24.571 0 31.429-17.714 33.143-29.143v-229.714h9.143c-3.429-0.571-6.857-0.571-9.143-0.571v-164c-3.429-18.286-14.857-38.857-50.857-38.857 0 0 1.143-1.143-63.429 0v-93.714l121.143 0.571c17.714 0 36.571 0 55.429-0.571v-144h88v141.143c23.429-0.571 46.857-1.143 69.714-1.143v-140h88v144c113.143 9.714 202.857 44.571 212.571 148.571zM544 677.143c0-113.143-186.286-96.571-245.714-96.571v193.143c59.429 0 245.714 12.571 245.714-96.571zM503.429 405.143c0-103.429-155.429-88-205.143-88v175.429c49.714 0 205.143 11.429 205.143-87.429z"></path>
                </svg>
                <a href="#sats" className="home-text02 nav-link">
                  ORDINALS
                </a>
              </div>
            </div>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <button className="home-button1 button">
              <img alt="image" src="/hamburger.svg" className="home-image" />
              <span className="home-text05">Start a project</span>
            </button>
          </div>
          <div data-thq="thq-mobile-menu" className="home-mobile-menu">
            <div
              data-thq="thq-mobile-menu-nav"
              data-role="Nav"
              className="home-nav"
            >
              <div className="home-top">
                <div className="home-branding1">
                  <img
                    alt="image"
                    src="/favicon-200h.png"
                    className="home-logo1"
                  />
                  <span className="home-company1">₿WYC</span>
                </div>
                <div data-thq="thq-close-menu" className="home-menu-close">
                  <svg viewBox="0 0 1024 1024" className="home-icon08">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <div className="home-items1">
                <div className="home-links1">
                  <a
                    href="https://boredwhalesyachtclub.org/#mint"
                    className="home-link2 nav-link"
                  >
                    🎴WHALECARDS
                  </a>
                  <span className="nav-link">🐋MEMBERS</span>
                  <a href="#sats" className="nav-link">
                    🎭ORDINALS
                  </a>
                </div>
                <button className="start-button button home-button2">
                  <span className="home-text08">CONNECT</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <header className="home-hero">
        <div className="home-header">
          <h1 className="home-title"></h1>
          <div className="home-container01">
            <div className="home-container02">
              <div className="home-container03">
                <img
                  alt="image"
                  src="/z%20(30)-200w.png"
                  className="home-image1"
                />
                <img
                  alt="image"
                  src="/z%20(58)-300h.png"
                  className="home-image2"
                />
              </div>
              <div className="home-container04">
                <img
                  alt="image"
                  src="/z%20(68)-200h.png"
                  className="home-image3"
                />
                <img
                  alt="image"
                  src="/z%20(7)-200w.png"
                  className="home-image4"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="home-description">
          Cross-Chain NFT Community on EVM and BITCOIN as Ordinals. Members have
          access to Whaleverse. Mint Whalecards or #Whale NFT on Youngparrot to
          join the club. 
        </p>
      </header>
      <div id="sats"></div>
      <App1 />
      <hr />
      <div className="home-about">
        <div className="home-client-list">
          <div className="home-row1">
            <span className="home-text30">SUPPORTED WALLETS</span>

            <div className="home-list2">
              <a href="https://www.xverse.app/download">
                <img
                  src="https://play-lh.googleusercontent.com/UiUoRVY5QVI5DAZyP5s6xanuPRrd8HNbKGpjKt3HVPVuT6VJcnXVqR7V4ICQ9rYRCg"
                  alt="xverse"
                  height={50}
                  style={{
                    border: "solid",
                    color: "white",
                    borderWidth: "1px",
                    borderRadius: "32px",
                  }}
                />

                <hr />
                <span className="home-text35" style={{ fontFamily: "courier" }}>
                  Xverse Wallet
                </span>
              </a>
              <hr />
              <a href="https://leather.io/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROY1uzrlM6vMg6NvLvhUEvPhaKfWnWIOc3WE7Oru40Ih5uUAlMPVVhdg2_SKXlPkTA-S0&usqp=CAU"
                  alt="xverse"
                  height={50}
                  style={{
                    border: "solid",
                    color: "white",
                    borderWidth: "1px",
                    borderRadius: "32px",
                  }}
                />

                <hr />
                <span className="home-text35" style={{ fontFamily: "courier" }}>
                  Leather Wallet
                </span>
              </a>
              <div className="home-item6 service"></div>
            </div>
          </div>
        </div>
      </div>
      <footer className="home-footer">
        <div className="home-information">
          <div className="home-details12">
            <div className="home-header7">
              <div className="home-branding2">
                <img
                  alt="image"
                  src="/favicon-200h.png"
                  className="home-logo2"
                />
                <span className="home-company3">₿WYC</span>
              </div>
              <div className="home-location">
                <span className="home-caption2">Location</span>
                <span className="home-value">
                  <span>DEEP! DEEP! DEEP! DEEP! DEEP! IN THE OCEAN </span>
                  <br></br>
                  <span>000-123</span>
                  <br></br>
                </span>
              </div>
            </div>
            <div className="home-location1">
              <span className="home-caption3">Support</span>
              <span className="home-value1">
                Support@boredwhalesyachtclub.org
              </span>
            </div>
            <button className="home-button4 start-button button">
              <span className="home-text50">ENTER WHALESVERSE</span>
            </button>
          </div>
          <div className="home-links2">
            <span className="home-social social">Discord</span>
            <span className="home-social1 social">Twitter</span>
          </div>
        </div>
        <img
          alt="image"
          src="/z%20(517)-1500w.png"
          loading="lazy"
          className="home-image8"
        />
      </footer>
    </div>
  );
};

export default Home;
