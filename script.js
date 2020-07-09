const searchButton = document.querySelector('.searchButton'); 
const resetButton = document.querySelector('.resetButton'); 
const cardTemplate = document.querySelector('template'); 
const searchContainer = document.querySelector('.searchContainer');
const fillContainer = document.querySelector('.fillContainer');  
const error = document.querySelector('.error'); 
const nextButton = document.querySelector('.nextButton'); 
const prevButton = document.querySelector('.prevButton'); 
const search = document.querySelector('.search'); 
const form = document.querySelector('form'); 
const moviePage = document.querySelector('.moviePage'); 
const modalCloseButton = document.querySelector('.movieCloseButton'); 
const movieTitle = document.querySelector('.movieTitle'); 
const moviePoster = document.querySelector('.moviePoster'); 
const movieRated = document.querySelector('.movieRated'); 
const movieYear = document.querySelector('.movieYear'); 
const movieGenre = document.querySelector('.movieGenre'); 
const movieActors = document.querySelector('.movieActors'); 
const movieRatingsContainer = document.querySelector('.movieRatingsContainer');
const moviePageCard = document.querySelector('.moviePageCard'); 

let page = 1; 
let category = "x-men"

fetch(`https://www.omdbapi.com/?s=${category}&apikey=c0b965ad`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            showMovies(response.Search, fillContainer)
            console.log(response); 
        })
        .catch(err => {
            console.log(err);
        });    


const getData = (e) => {
    e.preventDefault(); 
    console.log(page); 
    searchContainer.textContent = ""; 
    error.textContent = "";
    error.classList.add('display-none');  
    let query = search.value; 
    fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=c0b965ad`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            showMovies(response.Search, searchContainer); 
        })
        .catch(err => {
            console.log(err);
            error.classList.remove('display-none'); 
            error.textContent =  "No results"
        });    
}

const getMoreData = (e) => {
    movieRatingsContainer.innerText = ""; 
    
    fetch(`http://www.omdbapi.com/?i=${e}&apikey=c0b965ad`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response); 
            showMoviePoster(response); 
        })
        .catch(err => {
            console.log(err);
        });    
}

const showMovies = (data, parent) => {

    for (let i = 0; i < data.length; i ++){

        const listItem = document.createElement('div'); 
        listItem.classList.add('movieCard');
        parent.appendChild(listItem); 

        listItem.setAttribute('id', data[i].imdbID); 

        const cardImage = document.createElement('img'); 
        listItem.appendChild(cardImage); 

        const cardTitle = document.createElement('p');
        listItem.appendChild(cardTitle); 
    
        cardTitle.innerHTML = data[i].Title; 

        if(data[i].Poster === "N/A"){
            cardImage.setAttribute('src', './assets/movie-poster.jpg'); 
        }else{
            cardImage.setAttribute('src', data[i].Poster);
        }
        
        listItem.addEventListener('click', (e) =>{
            e.preventDefault(); 
            let movieID = data[i].imdbID; 
            getMoreData(movieID); 
            displayNone(); 
        })
    }
}

const showMoviePoster = (data) => {
  
    movieTitle.textContent = data.Title; 
    movieYear.textContent = data.Year; 
    movieGenre.textContent = data.Genre; 
    movieActors.textContent = data.Actors; 

    if(data.Poster === "N/A"){
        moviePoster.setAttribute('src', './assets/movie-poster.jpg'); 
    }else{
        moviePoster.setAttribute('src', data.Poster);
    }

    if(data.Rated = "N/A"){
        movieRated.textContent = "Unrated"; 
    }else{
        movieRated.textContent = data.Rated; 
    }

    const ratingsArray = data.Ratings; 
    console.log(ratingsArray); 

    for (let i = 0; i < ratingsArray.length; i++){
        const source = document.createElement('p'); 
        const value = document.createElement('p');
        const movieRatingsCard = document.createElement('div');

        movieRatingsCard.classList.add('movieRatingsCard'); 
        source.classList.add("movieRatingsSource"); 
        value.classList.add("movieRatingsValue");
        
        movieRatingsContainer.appendChild(movieRatingsCard); 
        movieRatingsCard.appendChild(source); 
        movieRatingsCard.appendChild(value); 

        source.innerText = ratingsArray[i].Source; 
        value.innerText = ratingsArray[i].Value; 
    }
}

const displayNone = () => {
    moviePage.classList.toggle('display-none'); 
}

searchButton.addEventListener('click', (e) =>{
    e.preventDefault()
    getData(e); 
}); 

nextButton.addEventListener('click', (e) => {
    e.preventDefault; 
    console.log(error.textContent); 
    if(error.textContent === "No results"){
        page = 1; 
    }else{
        page += 1;
    }
    getData(e); 
})

prevButton.addEventListener('click', function(e){
    e.preventDefault; 
    if(page > 1){
        page --; 
    }else{
        page = 1; 
    }
        getData(e); 
})

search.addEventListener('click', function(){
    page = 1; 
    form.reset(); 
})

modalCloseButton.addEventListener('click', (e) => {
    moviePoster.setAttribute('src', "https://map.stjohns.ca/mapcentre/assests/images/loading.gif");
    displayNone(); 
}); 
