import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import beijing from "../images/beijing.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";

const cities = [
  { name: "Dallas", image: dallas },
  { name: "Austin", image: austin },
  { name: "New York", image: newyork },
  { name: "San Francisco", image: sanfrancisco },
  { name: "Beijing", image: beijing },
];

const Hamburger = ({ state }) => {
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBachground = useRef(null);
  let cityBachground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      // colse our Menu
      gsap.to([revealMenu, revealMenuBachground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" },
      });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // open Our Menu
      gsap.to(menu, {
        duration: 0,
        css: { display: "block" },
      });
      gsap.to([revealMenu, revealMenuBachground], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(revealMenu, revealMenuBachground);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1,
      },
    });
  };

  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: 0.1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3,
      },
    });
  };
  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: 0.2,
      opacity: 0,
      ease: "power3.inOut",
    });
  };

  const handleCity = (city) => {
    gsap.to(cityBachground, {
      duration: 0,
      background: `url(${city}) center center`,
    });
    gsap.to(cityBachground, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut",
    });
    gsap.from(cityBachground, {
      duration: 0.4,
      skewY: 2,
      transformOrigin: "right top",
    });
  };

  const handleCityReturn = () => {
    gsap.to(cityBachground, {
      duration: 0.4,
      opacity: 0,
    });
  };

  const handleHover = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power3.inOut",
    });
  };
  const handleHoverExit = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <div ref={(el) => (menu = el)} className='hamburger-menu'>
      <div
        ref={(el) => (revealMenuBachground = el)}
        className='menu-secondary-background-color'
      ></div>
      <div ref={(el) => (revealMenu = el)} className='menu-layer'>
        <div
          ref={(el) => (cityBachground = el)}
          className='menu-city-background'
        ></div>
        <div className='container'>
          <div className='wrapper'>
            <div className='menu-links'>
              <nav>
                <ul>
                  <li>
                    {" "}
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line1 = el)}
                      to='/opportunities'
                    >
                      Opportunities
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line2 = el)}
                      to='/solutions'
                    >
                      Solutions
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line3 = el)}
                      to='/contact-us'
                    >
                      Contact Us
                    </Link>{" "}
                  </li>
                </ul>
              </nav>
              <div
                onMouseEnter={(e) => handleHover(e)}
                onMouseOut={(e) => handleHoverExit(e)}
                ref={(el) => (info = el)}
                className='info'
              >
                <h3>Our Promise</h3>
                <p>
                  Ask especially collecting terminated may son expression.
                  Extremely eagerness principle estimable own was man. Men
                  received far his dashwood subjects new. My sufficient
                  surrounded an companions dispatched in on. Connection too
                  unaffected expression led son possession. New smiling friends
                  and her another. Leaf she does none love high yet. Snug love
                  will up bore as be. Pursuit man son musical general pointed.
                  It surprise informed mr advanced do outweigh.
                </p>
              </div>
              <div className='locations'>
                Locations:
                {cities.map((el) => (
                  <span
                    key={el.name}
                    onMouseEnter={() => handleCity(el.image)}
                    onMouseOut={handleCityReturn}
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
