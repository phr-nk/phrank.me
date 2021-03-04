import React from "react";
import "./About.css";

var face = require("../../assets/face.png");

class About extends React.Component {
  render() {
    return (
      <div id="aboutcontainer">
        <h1 id="about">About Me </h1>
        <p>
          I am a recent graduate from DePaul University with a Bachelor's of
          Science degree in Computer Science. I have 3 and a half years of
          experience working on different software projects using various tech
          stacks. I am passionate about developing creative things, whether that
          be software related or something more artistic like music. This page
          is dedicated to showcasing some of these and if would like to contact
          me, my information is located at the bottom of the page. Thanks for
          stopping by :) - phrank
        </p>
      </div>
    );
  }
}
export default About;
