import React from "react";
import { Link } from "react-router-dom";
import "./Project.css";
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, symbol: "+" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    this.setState({ open: !this.state.open });
    this.state.symbol === "+"
      ? this.setState({ symbol: "-" })
      : this.setState({ symbol: "+" });
  };
  handleLinkClick() {}
  render() {
    return (
      <div className="project-card">
        <div className="project-text">
          <div className="project-title">{this.props.name}</div>
          <div className="project-subtitle">
            <br></br>
            {this.props.subtitle}
            <div onClick={this.handleClick} className="collapsible">
              {this.state.symbol}
            </div>
          </div>

          {this.state.open ? (
            <div className="project-content">
              Links:{" "}
              <a
                href={this.props.github}
                className="link-url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repo
              </a>
              ,
              <a
                className="link-url"
                href={this.props.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Url
              </a>
            </div>
          ) : null}
        </div>

        <Link to={`/projects/${this.props.id}`} onClick={this.handleLinkClick}>
          {" "}
          <img
            className="project-image"
            alt="project.name"
            src={this.props.img}
          />{" "}
        </Link>
      </div>
    );
  }
}

export default Project;
