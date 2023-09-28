// const url = 'https://api.unsplash.com/photos/random?query=nature&client_id=3On3S9wWwINjjBODC1Of5GFsFbbpsj-1MGDaW_7SSG4'

const container = document.querySelector('.container')
const searchInput = document.getElementById('searchTag')
let request = 'nature'
let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=ab9b2b1f314bb455de8266b2ece22d91&tags=${request}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`

// searchInput.addEventListener('input', ()=>{
  
//   console.log(url)
// })

searchInput.addEventListener('keyup', (event)=>{
  if ( event.code === 'Enter') {
    event.preventDefault()
    request = searchInput.value
    container.innerHTML = ''
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=ab9b2b1f314bb455de8266b2ece22d91&tags=${request}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`
    getImages ()
  }
})

async function getData (url) {
  const result = await fetch(url)
  const data = await result.json()
  return data.photos.photo
}

async function getImages () {
  try {
    const data = await getData (url)
    let fragment = new DocumentFragment ()

    for (let i = 0; i < data.length; i++) {
      let div = document.createElement('div')
      const imgUrl = data[i].url_m
      // console.log(imgUrl)
      div.className = 'photo-item'
      div.style.background = `url('${imgUrl}')`
      fragment.append(div)
    }
    container.append(fragment)
  } catch (error) {
    console.error('Error getting or displaying images:', error)
  }
}

getImages ()







