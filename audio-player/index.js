// import music from './playlists.js'

// let isPlay = false
// const soundControl = document.querySelector('.control-sound')
// const nextControl = document.querySelector('.control-next')
// const previousControl = document.querySelector('.control-previous')
// const progress = document.getElementById('songProgress')


// const pills = Array.from(document.getElementsByName('genre'))
// const playlistWrapper = document.querySelector('.playlist-wrapper')
// let currentPlaylist = getCurrentPlaylist ()
// let currentSongIndex = 0
// const audio = new Audio();

// pills.forEach((pill) => {
//   pill.addEventListener('click', function () {
//     playlistWrapper.innerHTML = '';
//     currentPlaylist = getCurrentPlaylist();
//     loadPlaylist ()
//     console.log('test')
//   })
// })

// soundControl.addEventListener('click', function () {
//   playAudio()
// })
// audio.addEventListener('ended', playNextSong);

// function playControlToggle () {
//   if (!isPlay) {
//     soundControl.classList.add('pause')
//   } else {
//     soundControl.classList.remove('pause')
//   }
// }

// function playAudio() {
//   if (currentSongIndex < currentPlaylist.length) {
//     if (!isPlay) {
//       playControlToggle();
//       const song = currentPlaylist[currentSongIndex]
//       audio.src = song.url
//       audio.play()
//       isPlay = true
//     } else {
//       playControlToggle();
//       audio.pause();
//       isPlay = false;
//     }
//   }
  
// }

// function playNextSong() {
//   if (isPlay) {
//     currentSongIndex++;
//     if (currentSongIndex < currentPlaylist.length) {
//       audio.src = currentPlaylist[currentSongIndex].url;
//       audio.play();
//     } else {
//       playControlToggle();
//       audio.pause();
//       isPlay = false;
//     }
//   }
// }

// function playPrevSong() {
//   if (isPlay) {
//     currentSongIndex--;
//     if (currentSongIndex < currentPlaylist.length && currentSongIndex >= 0) {
//       audio.src = currentPlaylist[currentSongIndex].url;
//       audio.play();
//     } else {
//       playControlToggle();
//       audio.pause();
//       isPlay = false;
//     }
//   }
// }

// nextControl.addEventListener('click', playNextSong)
// previousControl.addEventListener('click', playPrevSong)


// // Find current playlist
// function getCurrentPlaylist () {
//   const pillChecked = pills.filter(pill => pill.checked)
//   console.log(pillChecked)
//   const playlist = pillChecked[0].id
//   return music[playlist]
// }

// //Paste playlist data
// function loadPlaylist () {
//     currentPlaylist.forEach(song => {
//       const songItemLayout = `
//           <div class="song-item-wrapper">
//             <div class="song-item-cover-wrapper">
//               <img src="${song.cover}" alt="${song.band} - ${song.title} Song Cover" class="song-item-cover-img">
//             </div>
//             <div class="song-item-info">
//               <div class="song-item-title">${song.title}</div>
//               <div class="song-item-author">${song.band}</div>
//             </div>
//             <div class="song-item-controls">
//               <span class="song-item-duration">${song.duration}</span>
//               <button class="control song-item-control"><img src="assets/svg/play-small-sign.svg" alt="" class="control-img"></button>
//             </div>
//           </div>`
//       playlistWrapper.insertAdjacentHTML('beforeend', songItemLayout)
//     });
//   }

// loadPlaylist ()

// function loadProgress () {
//   audio.onloadedmetadata = function () {
//     progress.max = audio.duration
//     progress.value = audio.currentTime
//   }
//   if (!audio.paused) {
//     setInterval(()=>{
//       progress.value = audio.currentTime
//     },500)
//   }
// }



// New attempt to code the player

import music from './playlists.js'
const audio = new Audio()

const currentCover = document.querySelector('.cover-img') // обложка текущей песни
const currentSongTitle = document.querySelector('.song-title') // название текущей песни
const currentSongBand = document.querySelector('.song-author') // название текущей группы
let pills = Array.from(document.getElementsByName('playlist')) //массив радио плейлистов
const playlistWrapper = document.querySelector('.playlist-wrapper')

const prevControl = document.querySelector('.control-previous') //кнопка previous
const nextControl = document.querySelector('.control-next') //кнопка next
const mainControl = document.querySelector('.control-sound') //кнопка play/pause

const progress = document.getElementById('progress') //прогресс песни
const currentTimeValue = document.getElementById('current-time') //span текущее время
const durationValue = document.getElementById('duration') //span продолжительность песни

const volumeControl = document.querySelector('.control-volume') //кнопка мьюта
const progressVolume = document.getElementById('volume') //прогресс громкости


let isPlay = false
let songIndex = 0
let playlist = getPlaylist ()
loadCurrentPlaylist () //загружаю текущий плейлист
loadCurrentSondData () //подгружаю cover / title / band текущей песни
updateProgress ()

//подгружаю плейлисты по клику радио
pills.forEach((pill) => {
  pill.addEventListener('click', function () {
    playlistWrapper.innerHTML = '';
    loadCurrentPlaylist ()
    getNewSong ()
  })
})

getNewSong ()

function getNewSong () {
  const songControls = document.querySelectorAll('.song-item-control')

  songControls.forEach((control, index)=>{
    control.addEventListener('click', (e) =>{
      e.stopPropagation();
      let newPlaylist = getPlaylist ()
      if (playlist === newPlaylist) {
        if ((isPlay && index !== songIndex) || (!isPlay && index !== songIndex) || (!isPlay && index === songIndex)) {
          playNewSong(index, newPlaylist, newPlaylist[index])
          const targetElement = e.target
          defineTargetElement(targetElement)
        } else {
          pauseSong ()
          const songIcons = document.querySelectorAll('.control-img')
          songIcons.forEach((icon)=>{
            icon.src = 'assets/svg/play-small-sign.svg'
            console.log(icon.src)
            console.log('test')
          })
        }
      } else {
        playNewSong(index, newPlaylist, newPlaylist[index])
          const targetElement = e.target
          defineTargetElement(targetElement)
      }
      // console.log(targetElement)
      // return {songIndex: index, song: playlist[index]}
    })
  })
}

function playNewSong(index, newPlaylist, song) {
  playlist = newPlaylist
  songIndex = index
  loadCurrentSondData ()
  playSong ()
  audio.addEventListener('ended', playNext)
}

function defineTargetElement (target) {
  const songIcons = document.querySelectorAll('.control-img')
  if (target.classList.contains('song-item-control')) {
    const targetIcon = target.querySelector('.control-img')
    console.log(target)
    changeStyleActiveControl (songIcons, target, targetIcon)
  } else {
    const targetButton = target.closest('.song-item-control');
    console.log(targetButton)
    changeStyleActiveControl (songIcons, targetButton, target)
  }
}

function changeStyleActiveControl (icons, control, icon) {
  icons.forEach((icon)=>{
    icon.src = 'assets/svg/play-small-sign.svg'
  })
  control.classList.add('song-item-control-active')
  icon.src = 'assets/svg/pause-small-sign.svg'
}

// Initialisation
function getPlaylist () {
  const pillChecked = pills.filter(pill => pill.checked)
  const playlist = pillChecked[0].id
  return music[playlist]
}

function loadCurrentPlaylist () {
  const songsWrapper = document.querySelector('.playlist-wrapper')

  const playlist = getPlaylist ()
  playlist.forEach((song)=>{
    const songWrapper = document.createElement('div') //обертка целой песни
    songWrapper.className = 'song-item-wrapper'

    const songCoverWrapper = document.createElement('div') //обертка обложки
    songCoverWrapper.className = 'song-item-cover-wrapper'

    songWrapper.appendChild(songCoverWrapper) //вставляю обертку обложки в обертку песни

    const coverImg = document.createElement('img') // изображение обертки
    coverImg.src = song.cover
    coverImg.alt = `${song.band} - ${song.title} Song Cover`
    coverImg.className = 'song-item-cover-img'

    songCoverWrapper.appendChild(coverImg)

    const songInfo = document.createElement('div') //обертка информации о песне
    songInfo.className = 'song-item-info'

    const songTitle = document.createElement('div')
    songTitle.className = 'song-item-title'
    songTitle.textContent = song.title

    const songBand = document.createElement('div')
    songBand.className = 'song-item-author'
    songBand.textContent = song.band

    songInfo.appendChild(songTitle)
    songInfo.appendChild(songBand)

    const songControls = document.createElement('div') //обертка контролов песни
    songControls.className = 'song-item-controls'

    const songDuration = document.createElement('span')
    songDuration.className = 'song-item-duration'
    songDuration.textContent = song.duration

    const songControl = document.createElement('button')
    songControl.className = 'control song-item-control'

    const controlIcon = document.createElement('img')
    controlIcon.className = 'control-img'
    controlIcon.src = 'assets/svg/play-small-sign.svg'
    controlIcon.alt = ''

    songWrapper.appendChild(songInfo);
    songWrapper.appendChild(songControls);

    songControls.appendChild(songDuration)
    songControls.appendChild(songControl)
    songControl.appendChild(controlIcon)

    songsWrapper.appendChild(songWrapper)
  })
}

//           <div class="song-item-wrapper">
//             <div class="song-item-cover-wrapper">
//               <img src="${song.cover}" alt="${song.band} - ${song.title} Song Cover" class="song-item-cover-img">
//             </div>
//             <div class="song-item-info">
//               <div class="song-item-title">${song.title}</div>
//               <div class="song-item-author">${song.band}</div>
//             </div>
//             <div class="song-item-controls">
//               <span class="song-item-duration">${song.duration}</span>
//               <button class="control song-item-control">
//                 <img src="assets/svg/play-small-sign.svg" alt="" class="control-img">
//               </button>
//             </div>
//           </div>

function loadCurrentSondData () {
  currentCover.src = playlist[songIndex].cover
  currentSongTitle.innerHTML = playlist[songIndex].title
  currentSongBand.innerHTML = playlist[songIndex].band
  audio.src = playlist[songIndex].url
  durationValue.innerHTML = playlist[songIndex].duration
  // progressVolume.value = '50'
  // audio.volume = 0.5
}

// function playPause () {
//   if (!isPlay) {
//     mainControl.classList.add('pause')
//     audio.play()
//     isPlay = 1 - isPlay
//   } else {
//     mainControl.classList.remove('pause')
//     audio.pause()
//     isPlay = 1 - isPlay
//   }
// }

function checkPlaylist () {
  let newPlaylist = getPlaylist ()
  if (playlist === newPlaylist) {
    changeSongsControls ()
  }
}

function changeSongsControls () {
  const songIcons = document.querySelectorAll('.control-img') //берет все иконки маленький кнопок play
  if (!isPlay) { //если музыка играет
    songIcons[songIndex].src = 'assets/svg/play-small-sign.svg'
  } else {
    songIcons[songIndex].src = 'assets/svg/pause-small-sign.svg'
  }
}

function playSong () {
  mainControl.classList.add('pause')
  checkPlaylist ()
  audio.play()
  isPlay = true
}

function pauseSong () {
  mainControl.classList.remove('pause')
  checkPlaylist ()
  audio.pause()
  isPlay = false
}

function playNext () {
  resetActiveControls ()
  songIndex++
  songIndex >= playlist.length ? songIndex = 0 : songIndex = songIndex
  loadCurrentSondData ()
  playSong()
  checkPlaylist ()
}

function playPrev () {
  resetActiveControls ()
  songIndex--
  songIndex < 0 ? songIndex = playlist.length - 1 : songIndex = songIndex
  loadCurrentSondData ()
  playSong()
  checkPlaylist ()
}

function resetActiveControls () {
  const songIcons = document.querySelectorAll('.control-img')
          songIcons.forEach((icon)=>{
            icon.src = 'assets/svg/play-small-sign.svg'
})
}

// updateProgress ()

mainControl.addEventListener('click', ()=>{
  isPlay ? pauseSong () : playSong ()
})
nextControl.addEventListener('click', ()=>{
  playNext ()
  console.log(playlist, songIndex, isPlay)
  isPlay = true
})
prevControl.addEventListener('click', ()=>{
  playPrev ()
  console.log(playlist, songIndex, isPlay)
  isPlay = true
})
// prevControl.addEventListener('click', playPrev)
audio.addEventListener('ended', playNext)



function updateProgress () {
  audio.onloadedmetadata = function() {
    progress.max = audio.duration
    progress.value = audio.currentTime
  }
  audio.addEventListener('timeupdate', function() {
    currentTimeValue.innerHTML = convertTime(audio.currentTime)
    progress.value = audio.currentTime
  });
}

progress.oninput = function () {
  audio.currentTime = progress.value
}


function convertTime (time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  minutes = formatTime(minutes)
  seconds = formatTime(seconds)
  return `${minutes}:${seconds}`
}

function formatTime (time) {
  if (time < 10) {
    time = `0${time}`
  }
  return time
}


let currentVolume = audio.volume
let currentProgressVolume = progressVolume.value

volumeControl.addEventListener('click', ()=>{
    soundMute()
})

progressVolume.oninput = function () {
  // audio.volume = Math.round(progressVolume.value / 10) / 10
  audio.volume = progressVolume.value / 100
  currentProgressVolume = progressVolume.value
  console.log(progressVolume.value)
  if (audio.volume === 0) {
    volumeControl.classList.add('control-volume-stop')
  } else {
    volumeControl.classList.remove('control-volume-stop')
  }
}

function soundMute () {
  if (audio.volume !== 0) {
    volumeControl.classList.add('control-volume-stop')
    progressVolume.value = 0
    audio.volume = 0.0
  } else {
    volumeControl.classList.remove('control-volume-stop')
    progressVolume.value = currentProgressVolume
    audio.volume = currentVolume
  }
}

function highlightActiveSong () {
  let playlist = getPlaylist ()
  let song = playlist[songIndex]
  const songItems = document.querySelectorAll('.song-item-info')
  let songWrapper = songControls
}














// `
//           <div class="song-item-wrapper">
//             <div class="song-item-cover-wrapper">
//               <img src="${song.cover}" alt="${song.band} - ${song.title} Song Cover" class="song-item-cover-img">
//             </div>
//             <div class="song-item-info">
//               <div class="song-item-title">${song.title}</div>
//               <div class="song-item-author">${song.band}</div>
//             </div>
//             <div class="song-item-controls">
//               <span class="song-item-duration">${song.duration}</span>
//               <button class="control song-item-control">
//                 <img src="assets/svg/play-small-sign.svg" alt="" class="control-img">
//               </button>
//             </div>
//           </div>`

// // Play Sound
// function playNext () {

// }

// function playPrev () {

// }

// // Progress Bar



// // Volume





