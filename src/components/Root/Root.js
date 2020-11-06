import React from "react";
import ThreeDScene from "../header/ThreeDScene";
import "./Root.css";
import Fade from "react-reveal/Fade";
import About from "../About/About";
import Project from "../Project/Project";

import Contact from "../Contact/Contact";

import fetchProjects from "../../api/apiProjects";

var pdf = require("../../assets/updated_resume_8_2020.pdf");
var default_picture = require("../../assets/binary.jpg");
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: null, isSticky: false };
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
  handleScroll = () => {
    window.scrollY >
    document.getElementById("title").getBoundingClientRect().bottom
      ? this.setState({ isSticky: true })
      : this.setState({ isSticky: false });
  };
  render() {
    if (this.state.projects === null) {
      return (
        <div id="rootmain">
          <h1>LOADING</h1>
        </div>
      );
    } else {
      return (
        <div id="rootmain">
          
          <a href="#projectsection" id="projects">
            Projects
          </a>{" "}
          <a className="contactStyle" href="#contact">
            Contact
          </a>
          <a className="resume" href="#pdf">
            Resume
          </a>
          <section id="threescene">
            {" "}
            <ThreeDScene />{" "}
          </section>
          <div className="introSlide"> <h1 className="introText">Welcome to PHRANK.ME</h1>  </div>
          <h1 id="title">Hi, I'm Frank Lenoci </h1>
          <h2 id="subtitle">Click Anywhere Above for Ripple Effect </h2>
          
          <Fade bottom>
            <About></About>
          </Fade>
          <Fade bottom>
            <div id="projectsection">
              <h1>PROJECTS</h1>
              <div id="projectcontainer">
                {this.state.projects.map((value, index) => {
                  return (
                    <Project
                      name={this.state.projects[index].name}
                      img={
                        this.state.projects[index].img != null
                          ? this.state.projects[index].img
                          : default_picture
                      }
                      subtitle={this.state.projects[index].subtitle}
                      url={this.state.projects[index].links[0].url}
                      github={this.state.projects[index].links[0].githubUrl}
                      id={this.state.projects[index].id}
                    ></Project>
                  );
                })}
              </div>
            </div>
          </Fade>
          <Fade bottom>
            <h1>RESUME</h1>
            <iframe title="resume" id="pdf" src={pdf}></iframe>
          </Fade>
          <Fade bottom>
            <div id="contact">
              <Contact></Contact>
           
              <footer >  <h2 className="footerText"> <hr></hr>Designed and Developed by Frank Lenoci</h2></footer>
            </div>
          </Fade>
        </div>
      );
    }
  }
}
export default Root;
