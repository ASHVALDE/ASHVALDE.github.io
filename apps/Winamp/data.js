const webamp = new Webamp({
    initialTracks: [
    
    {
      metaData: {
        artist: "Guns n Roses",
        title: "Dont Cry"
      },
      url: "public/music/1.mp3"
    },
    {
      metaData: {
        artist: "KDrew",
        title: "BullsEye"
      },
      url: "public/music/2.mp3"
    },
    {
      metaData: {
        artist: "Evanescence",
        title: "Bring me 2 life"
      },
      url: "public/music/3.mp3"
    },
    {
      metaData: {
        artist: "untitled",
        title: "Broly Vs. Goku"
      },
      url: "public/music/4.mp3"
    },
    {
      metaData: {
        artist: "untitled",
        title: "bonjovi - its_my_life_official_video"
      },
      url: "public/music/5.mp3"
    },
    {
      metaData: {
        artist: "Linkin Park",
        title: "GivenUp"
      },
      url: "public/music/6.mp3"
    },
    {
      metaData: {
        artist: "Green Day",
        title: "Boulevard of Broken Dreams (Official Audio)"
      },
      url: "public/music/7.mp3"
    },
],
  });

  webamp.renderWhenReady(document.getElementById("winamp")).then(() => {
  const el = document.getElementById("webamp");
  el.style.zIndex = 999999;
});
  webamp.onClose(() => {
    closeThisWindow2( "Winamp");

    webamp.dispose();
});