  const playlists = {
    "Lit yo": ["JGkazi6khPA","aMqI5NRuu38","mpiGgN66fug"],
    "chill": ["-KH6ZSavJ6Y","ZXni9_91ORs"],
  };

  let player;
  let currentGenre;
  let currentIndex = 0;
  let isPlaying = false;

  // Carga de la API
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  // API ready
  window.onYouTubeIframeAPIReady = () => {
    // Inicializamos con la primera pista de la primera playlist
    currentGenre = Object.keys(playlists)[0];
    const firstVideo = playlists[currentGenre][0];

    player = new YT.Player('player', {
      height: '349',
      width: '328',
      videoId: firstVideo,
      
      playerVars: { playsinline: 1,controls:0 },
      events: {
        onStateChange: onPlayerStateChange
      }
    });

    initUI();
  };

  function onPlayerStateChange(event) {
    // Actualiza estado de reproducción
    if (event.data === YT.PlayerState.PLAYING) {
      isPlaying = true;
      document.getElementById('playPauseBtn').textContent = '⏸️';
    } else {
      isPlaying = false;
      document.getElementById('playPauseBtn').textContent = '▶️';
    }
  }

  function initUI() {
    const genreSelect = document.getElementById('genere');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Rellenar select de géneros
    Object.keys(playlists).forEach((genre, idx) => {
      const opt = document.createElement('option');
      opt.value = genre;
      opt.textContent = genre;
      if (idx === 0) opt.selected = true;
      genreSelect.appendChild(opt);
    });

    // Cambiar de género
    genreSelect.addEventListener('change', () => {
      currentGenre = genreSelect.value;
      currentIndex = 0;
      loadCurrentVideo();
      renderButtons();
    });

    // Botón Play/Pause
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    });

    // Botón Anterior
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        loadCurrentVideo();
      }
    });

    // Botón Siguiente
    nextBtn.addEventListener('click', () => {
      if (currentIndex < playlists[currentGenre].length - 1) {
        currentIndex++;
        loadCurrentVideo();
      }
    });



    // Carga y reproduce la pista actual
    function loadCurrentVideo() {
      const videoId = playlists[currentGenre][currentIndex];
      player.loadVideoById(videoId);
    }

    // Primera renderización de botones
  }