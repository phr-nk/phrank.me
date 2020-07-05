import React from "react";
import ThreeDScene from "../header/ThreeDScene";
import "./Root.css";
import Fade from "react-reveal/Fade";
import About from "../About/About";
import Project from "../Project/Project";
import Contact from "../Contact/Contact";
import fetchProjects from "../../api/apiProjects";
var pdf = require("../../assets/Frank_Lenoci_Resume_2020_P.pdf");

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: null };
  }
  componentDidMount() {
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
    if (this.state.projects === null) {
      return (
        <div id="rootmain">
          <h1>LOADING</h1>
        </div>
      );
    } else {
      return (
        <div id="rootmain">
          <h1 id="title">Hi, I'm Frank Lenoci </h1>{" "}
          <h2 id="subtitle">Click Anywhere Below for Ripple Effect </h2>
          <a href="#projectsection" id="projects">
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
          <Fade right>
            <div id="projectsection">
              <h1>PROJECTS</h1>
              <div id="projectcontainer">
                {this.state.projects.map((value, index) => {
                  return (
                    <Project
                      name={this.state.projects[index].name}
                      img={this.state.projects[index].img}
                      subtitle={this.state.projects[index].subtitle}
                      link={this.state.projects[index].links[0].url}
                    ></Project>
                  );
                })}
              </div>
            </div>
          </Fade>
          <Fade left></Fade>
          <Fade left>
            <h1>RESUME</h1>
            <iframe id="pdf" src={pdf}></iframe>
          </Fade>
          <Fade bottom>
            <Contact></Contact>
          </Fade>
        </div>
      );
    }
  }
}
export default Root;
