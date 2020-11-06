import React, { Fragment } from "react";
import "./Project.css";
import fetchProjects from "../../api/apiProjects";
import { withRouter } from "react-router-dom";
const github = require("../../assets/icons/github_icon.png");
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      image: "",
      links: [],
      description: "",
      githubUrl: "",
      liveUrl: "",
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    window.scrollTo(0, 0);
    this.setState({ id: id });
    this.fetchData(id);

    //this.props.history.push(this.props.location);
  }
  returnToHomepage = () => {
    this.props.history.goBack();
  };
  fetchData = (id) => {
    fetchProjects().then((data) => {
      data.forEach((element) => {
        if (element.id === id) {
          this.setState({
            name: element.name,
            image: element.img,
            links: element.links,
            description: element.description,
            githubUrl: element.links[0].githubUrl,
            liveUrl: element.links[0].url,
          });
        }
      });
    });
  };
  render() {
    return (
      <Fragment>
        <button className="back-button" onClick={this.returnToHomepage}>
          {"<  Return to Homepage "}
        </button>
        <div className="projectPageTitle"> {this.state.name}</div>
        <img
          alt="main"
          className="projectPageImage"
          src={this.state.image}
          style={{height: 400, width:800, objectFit: "cover"}}
        ></img>
        <div className="projectPageTitle">
          DESCRIPTION{" "}
          <div className="projectPageContent">{this.state.description}</div>
        </div>
        <a className="projectPageLink" href={this.state.githubUrl}target= "_blank" rel="noopener noreferrer">
          <img alt="github" className="iconLink" src={github}></img>
          Source code
        </a>
        <a className="projectPageLink" href={this.state.liveUrl}target= "_blank" rel="noopener noreferrer">
          Live URL
          
        </a>
        {this.state.links[0] !== undefined ? (
          <div className="projectPageImageContainer">
            {this.state.links[0].extra_image1 !== undefined ? (
              <img
                alt="extra one"
                className="projectPageExtraImage"
                src={this.state.links[0].extra_image1}
              ></img>
            ) : (
              <di>No image</di>
            )}
            {this.state.links[0].extra_image2 !== undefined ? (
              <img
                alt="extra one"
                className="projectPageExtraImage"
                src={this.state.links[0].extra_image2}
              ></img>
            ) : (
              <di>No image</di>
            )}
            {this.state.links[0].extra_image3 !== undefined ? (
              <img
                alt="extra one"
                className="projectPageExtraImage"
                src={this.state.links[0].extra_image3}
              ></img>
            ) : (
              <di>No image</di>
            )}
          </div>
        ) : (
          <div>No images</div>
        )}
      </Fragment>
    );
  }
}

export default withRouter(ProjectPage);
