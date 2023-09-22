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

const progress = document.getElementById('progress')
const currentTimeValue = document.getElementById('current-time')
const durationValue = document.getElementById('duration')


let isPlay = 0
let songIndex = 0
const playlist = getPlaylist ()
loadCurrentPlaylist () //загружаю текущий плейлист
loadCurrentSondData () //подгружаю cover / title / band текущей песни

//подгружаю плейлисты по клику радио
pills.forEach((pill) => {
  pill.addEventListener('click', function () {
    playlistWrapper.innerHTML = '';
    loadCurrentPlaylist ()
  })
})


// Initialisation
function getPlaylist () {
  const pillChecked = pills.filter(pill => pill.checked)
  const playlist = pillChecked[0].id
  return music[playlist]
}

function loadCurrentPlaylist () {
  const playlist = getPlaylist ()
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
      const songControl = document.querySelector('.song-item-control')
    });
}

function loadCurrentSondData () {
  currentCover.src = playlist[songIndex].cover
  currentSongTitle.innerHTML = playlist[songIndex].title
  currentSongBand.innerHTML = playlist[songIndex].band
  audio.src = playlist[songIndex].url
  durationValue.innerHTML = playlist[songIndex].duration
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

function playSong () {
  mainControl.classList.add('pause')
  audio.play()
  updateProgress ()
  isPlay = 1 - isPlay
}

function pauseSong () {
  mainControl.classList.remove('pause')
  audio.pause()
  isPlay = 1 - isPlay
}

function playNext () {
  songIndex++
  songIndex >= playlist.length ? songIndex = 0 : songIndex = songIndex
  loadCurrentSondData ()
  updateProgress ()
  playSong()
}

function playPrev () {
  songIndex--
  songIndex < 0 ? songIndex = playlist.length - 1 : songIndex = songIndex
  loadCurrentSondData ()
  updateProgress ()
  playSong()
}

mainControl.addEventListener('click', ()=>{
  isPlay ? pauseSong () : playSong ()
})
nextControl.addEventListener('click', playNext)
prevControl.addEventListener('click', playPrev)
audio.addEventListener('ended', playNext)



function updateProgress () {
  audio.onloadedmetadata = function() {
    progress.max = Math.floor(audio.duration)
    progress.value = Math.floor(audio.currentTime)
    currentTimeValue.innerHTML = Math.floor(audio.currentTime);
  }

  audio.addEventListener('timeupdate', function() {
    currentTimeValue.innerHTML = Math.floor(audio.currentTime);
    progress.value = Math.floor(audio.currentTime);
  });

}







// // Play Sound
// function playNext () {

// }

// function playPrev () {

// }

// // Progress Bar



// // Volume





