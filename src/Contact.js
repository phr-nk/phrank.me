import React from "react";
import "./Contact.css";
const github = require("./assets/icons/github_icon.png")
const gmail = require("./assets/icons/gmail_icon.png")
const linkedin = require("./assets/icons/linkedin_icon.png")
function Contact()
{
    return(
        <div>
            <h1>CONTACT</h1>
            <div id="icon_container"> 
            <img  class="icon" src={github}></img>
           <img  class="icon" src={gmail}></img>
           <img  class="icon" src={linkedin}></img> 
        </div>
        </div>
    )
}

export default Contact;