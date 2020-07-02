import React from "react";
import ThreeDScene from "./ThreeDScene";
import "./Root.css";
import Fade from "react-reveal/Fade";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact"
import fetchProjects from "./api/apiProjects";
var pdf = require("./assets/Frank_Lenoci_Resume_2020_P.pdf");

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, projects: null };
  }
  componentDidMount() {
    let root = document.getElementsByTagName("html")[0];
    root.style.setProperty("--animationname", "loaded");
    this.setState({ loaded: true });
    this.fetchData();
  }

  fetchData = () => {
    fetchProjects().then((data) => {
      this.setState({ projects: data });
    });
  };
  render() {
    console.log(this.state.projects);
    return (
      <div id="rootmain">
        <h1 id="title">Hi, I'm Frank Lenoci </h1>{" "}
        <a href="" id="projects">
          Projects
        </a>{" "}
        <a class="resume" href="#pdf">
          Resume
        </a>
        <section id="threescene">
          {" "}
          <ThreeDScene />{" "}
        </section>
        <Fade right>
          <About></About>
        </Fade>
        <Fade left></Fade>
        <Fade left>
          <iframe id="pdf" src={pdf}></iframe>
        </Fade>
        <Fade bottom>
          <Contact></Contact>
        </Fade>
      </div>
    );
  }
}
export default Root;
