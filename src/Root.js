import React from "react";
import ThreeDScene from "./ThreeDScene";
import "./Root.css";
import Fade from "react-reveal/Fade";
import { wait } from "@testing-library/react";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    wait(10);
    let root = document.getElementsByTagName("html")[0];
    root.style.setProperty("--animationname", "loaded");
    this.setState({ loaded: true });
  }
  render() {
    return (
      <div>
        <h1 id="title">Hi, I'm Frank </h1> <div id="projects">Projects</div>{" "}
        <div class="resume">Resume</div>
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
