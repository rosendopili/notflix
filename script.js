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


const showMovies = (data, parent) => {

    for (let i = 0; i < data.length; i ++){

        const listItem = document.createElement('div'); 
        listItem.classList.add('movieCard');
        parent.appendChild(listItem); 

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
    }
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
    form.reset(); 
})
