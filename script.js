const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totoalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const query	= 'hawaii';
const apikey = 'jFmtV9WNq0rKdTMYkhnB6o3VQSq0rf8TIUVS5s7QyKU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}&query=${query}`;

// &query=${query}

// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++; 
    console.log(imagesLoaded);
    if (imagesLoaded === totoalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totoalImages = photosArray.length;
    console.log('total images', totoalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create anchor to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // Create img for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    // Event Listener, check when each is finished
    img.addEventListener('load', imageLoaded);
    // Put img inside anchor, then inside img container
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if near bottom of page to load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{
    ready = false;
    getPhotos();
}
});



// On Load
getPhotos();