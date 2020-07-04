export default async function fetchProjects() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        id: "Commuter",
        name: "Commuter Chronicles",
        subtitle: "An iOS app",
        description: "iOS app created for my class at depaul",
        links: [{ url: "https://github.com/phr-nk/CommuterChronicles" }],
        img:
          "https://raw.githubusercontent.com/phr-nk/CommuterChronicles/master/MapQuest/Assets.xcassets/appview1.png",
      },
      {
        id: "NYT",
        name: "New York Times Archiver - News Flash",
        subtitle: "React Website",
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
        subtitle: "Sudoku made in React",
        description: "Sudoku developed with React",
        links: [
          {
            githubUrl: "https://github.com/phr-nk/ReactSudoku",
            url: "https://phr-nk.github.io/ReactSudoku/",
          },
        ],
        img:
          "https://raw.githubusercontent.com/phr-nk/ReactSudoku/master/public/notcompleted.PNG",
      },
    ])
  );
}
