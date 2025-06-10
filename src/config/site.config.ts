const cdnURL =
  "https://cdn.jsdelivr.net/gh/fusiondex-org/infinite-fusion-graphics@main";

const config = {
  cdn: {
    baseURL: cdnURL,
    images: {
      autogen: `${cdnURL}/autogen`,
      fusion: `${cdnURL}/custom`,
      triple: `${cdnURL}/triples`,
      base: `${cdnURL}/base`,
      items: `${cdnURL}/Items`,
      pictures: `${cdnURL}/Pictures`,
      notFound: `${cdnURL}/triples/000.png`,
    },
  },
  api: {
    baseURL: "https://api.ifdex.eu",
    endpoints: {
      sprites: "sprite",
      artists: "artist",
      modules: "module",
      dex_author: "dex/author",
    },
  },
  site: {
    name: "Pokemon Infinite Fusion Calculator",
    mainURL: "https://pokemoninfinitefusioncalculator.xyz",
    gaId: "",
    adsenseId: "",
    socialLinks: {
      github: "https://github.com/kampita",
      githubRepo: "https://github.com/Kampita/infinite-fusion-calculator",
      x: "https://x.com/", // currently i dont have x account
      discord: "https://discordapp.com/", // currently i dont have discord account
    },
  },
  paths: {
    sprites: "sprites",
    artists: "artists",
    dex: "dex",
    fusion: "fusion",
  },
  placeholders: {
    artistName: "Coming Soon (WIP)",
    imageName: "autogen",
    imageURL: "/images/000.png",
    spoilerImage: "/images/spoiler.png",
  },
};

// Export everything together
export { config };
