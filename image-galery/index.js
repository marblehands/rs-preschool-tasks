// const url = 'https://api.unsplash.com/photos/random?query=nature&client_id=3On3S9wWwINjjBODC1Of5GFsFbbpsj-1MGDaW_7SSG4'

const container = document.querySelector('.container')
const searchInput = document.getElementById('searchTag')
let request = 'nature'
let colour = 'teal'
let url = `https://api.unsplash.com/search/photos?query=${request}&page=1&per_page=30&client_id=xpkVKYg3snMrvlOQ6Gv8flU7-1tz2TbAnS1k6b_nHf4`

// searchInput.addEventListener('input', ()=>{
  
//   console.log(url)
// })

searchInput.addEventListener('keyup', (event)=>{
  if ( event.code === 'Enter') {
    event.preventDefault()
    request = searchInput.value
    container.innerHTML = ''
    // url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=ab9b2b1f314bb455de8266b2ece22d91&tags=${request}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`
    url = `https://api.unsplash.com/search/photos?query=${request}&page=1&per_page=30&client_id=xpkVKYg3snMrvlOQ6Gv8flU7-1tz2TbAnS1k6b_nHf4`
    // `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=ab9b2b1f314bb455de8266b2ece22d91&tags=${request}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`
    getImages ()
  }
})

// Flickr
// async function getData (url) {
//   const result = await fetch(url)
//   const data = await result.json()
//   console.log(data)
//   return data.photos.photo
// }
// getData (url)
// Unsplash
async function getData (url) {
  const result = await fetch(url)
  const data = await result.json()
  // console.log(data)
  let urls = []
  for (let i = 0; i < data.results.length; i++) {
    urls.push(data.results[i].urls.regular)
  }
  // console.log(data.results[0].urls.regular)
  // console.log(urls)
  return urls
}

//Flickr
// async function getImages () {
//   try {
//     const data = await getData (url)
//     let fragment = new DocumentFragment ()

//     for (let i = 0; i < data.length; i++) {
//       let div = document.createElement('div')
//       const imgUrl = data[i].url_m
//       // console.log(imgUrl)
//       div.className = 'photo-item'
//       div.style.backgroundColor = '#111111'
//       div.style.background = `url('${imgUrl}')`
//       fragment.append(div)
//     }
//     container.append(fragment)
//   } catch (error) {
//     console.error('Error getting or displaying images:', error)
//   }
// }

// // Unsplash
// async function getImages () {
//   try {
//     const data = await getData (url)
//     let fragment = new DocumentFragment ()

//     for (let i = 0; i < 30; i++) {
//       let div = document.createElement('div')
//       const imgUrl = data[i]
//       // console.log(imgUrl)
//       div.className = 'photo-item'
//       div.style.backgroundColor = '#111111'
//       div.style.background = `url('${imgUrl}')`
//       fragment.append(div)
//     }
//     container.append(fragment)
//   } catch (error) {
//     console.error('Error getting or displaying images:', error)
//   }
// }

// Unsplash
async function getImages () {
  try {
    const data = await getData (url)

      generateFirstTypeLayout (data, 0)
      generateFirstTypeLayout (data, 4)
      generateFirstTypeLayout (data, 8)
    

  } catch (error) {
    console.error('Error getting or displaying images:', error)
  }
}




function generateFirstTypeLayout (urls, i) {
    let fragment = new DocumentFragment ()
    const data = urls
  
    const layoutRow1 = document.createElement('div')
    layoutRow1.className = 'layout-row type1'
  
    const layoutRow2 = document.createElement('div')
    layoutRow2.className = 'layout-row type2'
  
    const layoutRowLeft = document.createElement('div')
    layoutRowLeft.className = 'layout-row-left'
  
    const layoutRowRight = document.createElement('div')
    layoutRowRight.className = 'layout-row-right'

    const imgItem = document.createElement('div')
    imgItem.classList = 'img-item'
    imgItem.style.background = `center / cover no-repeat url('${data[i]}')`

    const imgItemLeft = document.createElement('div')
    imgItemLeft.classList = 'img-item'
    imgItemLeft.style.background = `center / cover no-repeat url('${data[i+1]}')`

    const imgItemRightUp = document.createElement('div')
    imgItemRightUp.classList = 'img-item'
    imgItemRightUp.style.background = `center / cover no-repeat url('${data[i+2]}')`

    const imgItemRightBottom = document.createElement('div')
    imgItemRightBottom.classList = 'img-item'
    imgItemRightBottom.style.background = `center / cover no-repeat url('${data[i+3]}')`

    layoutRowLeft.append(imgItem)
    layoutRowRight.append(imgItemRightUp)
    layoutRowRight.append(imgItemRightBottom)
  
    layoutRow1.append(layoutRowLeft)
    layoutRow1.append(layoutRowRight)
  
    layoutRow2.append(imgItemLeft)
  
    fragment.append(layoutRow1)
    fragment.append(layoutRow2)
  
    container.append(fragment)
  
  
}


getImages ()

const inputsColour = Array.from(document.getElementsByName('colour'))
console.log(inputsColour)

inputsColour.forEach((input)=>{
  input.addEventListener('click', ()=>{
    if (input.checked) {
      colour = input.id
      console.log(colour)
      container.innerHTML = ''
      url = `https://api.unsplash.com/search/photos?query=${request}&page=1&per_page=30&color=${colour}&client_id=3On3S9wWwINjjBODC1Of5GFsFbbpsj-1MGDaW_7SSG4`
      getImages ()
    }
  })
})







