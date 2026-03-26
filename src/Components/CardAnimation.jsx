// src/Components/CardAnimation.jsx
import React from "react";
import "./styles/CardAnimation.css";
import Tilt from "react-parallax-tilt";


const CardAnimation = ({ children, dataAos }) => (
  <Tilt
    glareEnable={true}
    glareMaxOpacity={0.25}
    glareColor="#ffffff"
    glarePosition="bottom"
    tiltMaxAngleX={15}
    tiltMaxAngleY={15}
    perspective={1000}
    scale={1.05}
    transitionSpeed={1500}
    gyroscope={true}
    className="tilt-wrapper"
    data-aos={dataAos}
  >
    {children}
  </Tilt>
);

export default CardAnimation;
