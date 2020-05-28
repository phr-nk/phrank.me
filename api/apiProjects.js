export default {
  fetchProjects: () =>
    new Promise((resolve, reject) =>
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
      ])
    ),
};
