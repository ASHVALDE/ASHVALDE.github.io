const webamp = new Webamp({
    initialTracks: [{
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

],

  });

  webamp.renderWhenReady(document.getElementById("winamp"));
  webamp.onClose(() => {
    closeThisWindow2( "Winamp");

    webamp.dispose();
});