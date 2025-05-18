  let playlists = {
    "Lit yo": ["JGkazi6khPA","5tfDYbnbC6c","LgdE2trPfBw","eVBubpQbkg8"],
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
    let firstVideo = playlists[currentGenre][0];

    player = new YT.Player('player', {
      height: '349',
      width: '328',
      videoId: firstVideo,
      
      playerVars: { playsinline: 1,controls:0 },
      events: {
        onStateChange: onPlayerStateChange,

      }
    });

    initUI();
  };

  function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('playPauseBtn').textContent = '⏸️';
  } else if (event.data === YT.PlayerState.ENDED) {
    // Pasar al siguiente si hay más
    if (currentIndex < playlists[currentGenre].length - 1) {
      currentIndex++;
      player.loadVideoById(playlists[currentGenre][currentIndex]);
    } else {
      isPlaying = false;
      document.getElementById('playPauseBtn').textContent = '▶️';
    }
  } else {
    isPlaying = false;
    document.getElementById('playPauseBtn').textContent = '▶️';
  }
}

  function initUI() {
    let genreSelect = document.getElementById('genere');
    let playPauseBtn = document.getElementById('playPauseBtn');
    let prevBtn = document.getElementById('prevBtn');
    let nextBtn = document.getElementById('nextBtn');

    // Rellenar select de géneros
    Object.keys(playlists).forEach((genre, idx) => {
      let opt = document.createElement('option');
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
      let videoId = playlists[currentGenre][currentIndex];
      player.loadVideoById(videoId);
    }

    // Primera renderización de botones
  }
let pill = document.getElementById("slider");
let sliderBox = document.getElementById("sliderBox");
let isDragging = false;

// Actualiza la posición del “pill” según el progreso del vídeo
setInterval(() => {
  if (player && typeof player.getCurrentTime === "function" && !isDragging) {
    let progress = player.getCurrentTime() / player.getDuration();
    pill.style.left = (progress * 100) + "%";
  }
}, 200);

// ——————————————————————————————————————————————
// LISTENER PARA RATÓN
sliderBox.addEventListener("mousedown", (e) => {
  isDragging = true;
  updatePillPosition(e.clientX);
  seekVideo(e.clientX);
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updatePillPosition(e.clientX);
    seekVideo(e.clientX);
  }
});
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// ——————————————————————————————————————————————
// LISTENER PARA TOUCH
// En touchstart evitamos que el scroll interfiera
sliderBox.addEventListener("touchstart", (e) => {
  e.preventDefault();           // evita que “scroll” arrastre la página
  isDragging = true;
  let touchX = e.touches[0].clientX;
  updatePillPosition(touchX);
  seekVideo(touchX);
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    e.preventDefault();
    let touchX = e.touches[0].clientX;
    updatePillPosition(touchX);
    seekVideo(touchX);
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
}, { passive: false });

// ——————————————————————————————————————————————
// FUNCIONES AUXILIARES: recibiendo coordenada X en vez de evento
function updatePillPosition(clientX) {
  let rect = sliderBox.getBoundingClientRect();
  let pillWidth = pill.offsetWidth;
  let x = clientX - rect.left - pillWidth / 2;

  let percentage = (x + pillWidth / 2) / rect.width;
  percentage = percentage - 0.075;
  percentage = Math.max(0, Math.min(percentage, 1));

  pill.style.left = (percentage * 100) + "%";
}

function seekVideo(clientX) {
  let rect = sliderBox.getBoundingClientRect();
  let pillWidth = pill.offsetWidth;
  let x = clientX - rect.left - pillWidth / 2;

  let percentage = (x + pillWidth / 2) / rect.width;
  percentage = percentage - 0.075;
  percentage = Math.max(0, Math.min(percentage, 1));

  let seekTime = percentage * player.getDuration();
  player.seekTo(seekTime, true);
}