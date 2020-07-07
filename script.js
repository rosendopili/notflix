const searchButton = document.querySelector('.searchButton'); 
const resetButton = document.querySelector('.resetButton'); 
const cardTemplate = document.querySelector('template'); 

const getData = (e) => {
    e.preventDefault(); 
    const search = document.querySelector('.search').value; 
    console.log(search); 
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=c0b965ad`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        // console.log(response.Search); 
        // response.Search.map(val => {
        //     console.log(val); 
        // })
        addImageCard(response.Search); 
    })
    .catch(err => {
        console.log(err);
    });    
}


const addImageCard = (data) => {
    let form = document.querySelector('form'); 
    for (let i = 0; i < data.length; i ++){

    const list = document.querySelector('.container'); 
    const listItem = document.createElement('div'); 
    listItem.classList.add('movieCard'); 
    list.appendChild(listItem); 
    const cardImage = document.createElement('img'); 
    listItem.appendChild(cardImage); 
    const cardTitle = document.createElement('p');
    listItem.appendChild(cardTitle); 
   
    cardTitle.innerHTML = data[i].Title; 
    cardImage.setAttribute('src', data[i].Poster);
    }
    
    form.reset(); 
}

searchButton.addEventListener('click', (e) =>{
    e.preventDefault()
    getData(e); 
}); 

resetButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.location.reload(); 
})