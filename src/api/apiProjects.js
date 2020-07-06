export default async function fetchProjects() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        id: "Commuter",
        name: "Commuter Chronicles",
        subtitle: "An iOS app developed for my iOS class at DePaul.",
        description: "iOS app created for my class at depaul",
        links: [{ url: "https://github.com/phr-nk/CommuterChronicles" }],
        img:
          "https://raw.githubusercontent.com/phr-nk/CommuterChronicles/master/MapQuest/Assets.xcassets/appview1.png",
      },
      {
        id: "NYT",
        name: "New York Times Archiver - News Flash",
        subtitle: "Final project for my web applications class.",
        description:
          "A frontend website built for my web applications class at depaul",
        links: [
          {
            githubUrl: "https://github.com/ckleinvehn/CSC360-Final",
            url: "https://csc360-final-project.herokuapp.com/",
          },
        ],
        img:
          "https://raw.githubusercontent.com/ckleinvehn/CSC360-Final/master/src/images/nyt-logo.jpeg",
      },
      {
        id: "Sudoku",
        name: "React Sudoku",
        subtitle: "Sudoku front-end application utlizing React.",
        description: "Sudoku developed with ",
        links: [
          {
            githubUrl: "https://github.com/phr-nk/ReactSudoku",
            url: "https://phr-nk.github.io/ReactSudoku/",
          },
        ],
        img:
          "https://raw.githubusercontent.com/phr-nk/ReactSudoku/master/public/completed.PNG",
      },
      {
        id: "KB-Planner",
        name: "KB-Planner",
        subtitle:
          "A full-stack productivity website developed for my senior capstone.",
        description:
          "The purpose of KB Planner is to simplify the way for University students to efficiently manage and track group student projects. Through visualization of group workflow in a simplistic manner students will be able to both see the work assigned to each student as well as incentivize students to leave feedback on accomplishments of team members. This system will also allow for Professors to easily manage and check in with student groups throughout project timelines. The goal is to improve the painstaking process for assigning and completing group projects on University sponsored websites such as D2L.",
        links: [{ url: "https://github.com/phr-nk/KB-Planner-Front-End" }],
        img:
          "https://raw.githubusercontent.com/phr-nk/KB-Planner-Front-End/master/assets/projectpics/login.png",
      },
      {
        id: "PersonalWebsite",
        name: "Portfolio Website - phrank.me",
        subtitle:
          "My personal portfolio website developed using React and three.js.",
        description: "",
        links: [{ url: "https://github.com/phr-nk/phrank.me" }],
        img:
          "https://raw.githubusercontent.com/phr-nk/phrank.me/master/src/assets/threedhead.png",
      },
      {
        id: "RogueLike",
        name: "Command Line Rogue Like",
        subtitle:
          "A ASCII based rogue like you can play in the command line, written in C++.",
        description: "",
        links: [{ url: "https://github.com/phr-nk/CommandLineRogueLike" }],
        img:
          "https://raw.githubusercontent.com/phr-nk/CommandLineRogueLike/master/RogueLike.gif",
      },
      {
        id: "BopPi",
        name: "Bop Pi - Raspberry Pi Game",
        subtitle:
          "This was an attempt to recreate the 90's Bop It game but with 21st century features for the Raspberry Pi 3.",
        description: "",
        links: [{ url: "https://github.com/phr-nk/BopPi" }],
        img:
          "https://user-images.githubusercontent.com/28155935/55992181-9311fc00-5c71-11e9-9ea7-071dfa988cab.PNG",
      },
    ])
  );
}
