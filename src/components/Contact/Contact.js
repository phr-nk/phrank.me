import React from "react";
import "./Contact.css";
const github = require("../../assets/icons/github_icon.png");
const gmail = require("../../assets/icons/gmail_icon.png");
const linkedin = require("../../assets/icons/linkedin_icon.png");
function Contact() {
  return (
    <div>
      <h1>CONTACT</h1>
      <div id="icon_container">
        <a class="icon" href="https://github.com/phr-nk">
          {" "}
          <img class="icon" alt="github" src={github}></img>{" "}
        </a>
        <a class="icon" href="mailto:frank.c.lenoci@gmail.com">
          <img alt="gmail" class="icon" src={gmail}></img>{" "}
        </a>
        <a class="icon" href="https://www.linkedin.com/in/frank-lenoci/">
          {" "}
          <img alt="linkedin" class="icon" src={linkedin}></img>{" "}
        </a>
      </div>
    </div>
  );
}

export default Contact;
