function getDrinksName() {
    
    const searchText = document.querySelector('.searchText').ariaValue

    fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then (response => response.json())
    .then(data => {
        console.log(data.drinks)
    })
}



