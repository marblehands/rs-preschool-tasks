const music = {
  retro: [
    {
      title: 'Безумный Мир',
      band: 'Мираж',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/mirazh-bezumniy-mir.mp3',
      duration: '03:40',
    },
    {
      title: 'Su Di Noi',
      band: 'Pupo',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/pupo-sudinoi.mp3',
      duration: '03:20',
    },
    {
      title: 'Storie Di Tutti I Giorni',
      band: 'Riccardo Fogli',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/riccardo-fogli-storie-di-tutti-i-giorni.mp3',
      duration: '04:02',
    },
    {
      title: 'Asphalte',
      band: 'Alix',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/alix-asphalte.mp3',
      duration: '02:28',
    },
    {
      title: 'Asphalte',
      band: 'Alix',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/alix-asphalte.mp3',
      duration: '02:28',
    },
    {
      title: 'Asphalte',
      band: 'Alix',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/alix-asphalte.mp3',
      duration: '02:28',
    },
  ],

  punk: [
    {
      title: 'Безумный Мир',
      band: 'Мираж',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/mirazh-bezumniy-mir.mp3',
      duration: '03:40',
    },
    {
      title: 'Su Di Noi',
      band: 'Pupo',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/pupo-sudinoi.mp3',
      duration: '03:20',
    },
    {
      title: 'Storie Di Tutti I Giorni',
      band: 'Riccardo Fogli',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/riccardo-fogli-storie-di-tutti-i-giorni.mp3',
      duration: '04:02',
    },
    {
      title: 'Asphalte',
      band: 'Alix',
      cover: 'assets/img/cover.jpg',
      url: 'assets/audio/retro/alix-asphalte.mp3',
      duration: '02:28',
    },
  ]
}

let isPlay = false
const soundControl = document.querySelector('.control-sound')

// Main Sound Control Toggle
function soundControlToggle () {
  if (!isPlay) {
    soundControl.classList.add('pause')
  } else {
    isPlay = false
    soundControl.classList.remove('pause')
  }
}

soundControl.addEventListener('click', function () {
  soundControlToggle ()
})

// Find current playlist
function getCurrentPlaylist () {
  const pills = document.getElementsByName('genre')

  const pillsArr = Array.from(pills)
  const pillChecked = pillsArr.filter(pill => pill.checked)
  const playlist = pillChecked[0].id

  return music[playlist]
}

//Paste playlist data
function loadPlaylist () {
  const playlistWrapper = document.querySelector('.playlist-wrapper')
  const playlist = getCurrentPlaylist ()

  playlist.forEach(song => {
    const songItemLayout = `
        <div class="song-item-wrapper">
          <div class="song-item-cover-wrapper">
            <img src="${song.cover}" alt="${song.band} - ${song.title} Song Cover" class="song-item-cover-img">
          </div>
          <div class="song-item-info">
            <div class="song-item-title">${song.title}</div>
            <div class="song-item-author">${song.band}</div>
          </div>
          <div class="song-item-controls">
            <span class="song-item-duration">${song.duration}</span>
            <button class="control song-item-control"><img src="assets/svg/play-small-sign.svg" alt="" class="control-img"></button>
          </div>
        </div>`

    playlistWrapper.insertAdjacentHTML('beforeend', songItemLayout)
  });
}

loadPlaylist ()




