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
          Science degree in Computer Science. I have about 4 and a half years of
          experience working on different software projects using various tech
          stacks. Well-versed in both functional and object oriented programming
          languages, with a deep understanding of how to test and implement
          their respective data structures. Strengths reside mostly in web app
          and mobile app (iOS) development, also have some experience using
          Google's firebase for cloud computing. Passionate about developing
          creative applications to solve complex problems and learning new
          technologies.
        </p>
      </div>
    );
  }
}
export default About;
