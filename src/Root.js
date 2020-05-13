import React from "react";
import ThreeDScene from "./ThreeDScene";
import "./Root.css";
import Fade from "react-reveal/Fade";

class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi, I'm Frank </h1>
        <div id="projects">Projects</div>
        <div id="resume">Resume</div>
        <section id="threescene">
          {" "}
          <ThreeDScene />{" "}
        </section>
        <Fade left>
          <h1>I like to develop creative software</h1>
        </Fade>
      </div>
    );
  }
}
export default Root;
