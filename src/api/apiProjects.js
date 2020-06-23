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
          "https://github.com/phr-nk/CommuterChronicles/blob/master/MapQuest/Assets.xcassets/appview1.png",
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
          "https://github.com/ckleinvehn/CSC360-Final/blob/master/src/images/nyt-logo.jpg",
      },
      {
        id: "Sudoku",
        name: "React Sudoku",
        subtitle: "Sudoku made in React",
        description: "Sudoku developed with React",
        links: [
          {
            githubUrl: "https://github.com/phr-nk/ReactSudoku",
            url: "https://github.com/phr-nk/ReactSudoku",
          },
        ],
        img:
          "https://github.com/phr-nk/ReactSudoku/blob/master/public/notcompleted.PNG",
      },
    ])
  );
}
