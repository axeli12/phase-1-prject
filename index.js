document.addEventListener('DOMContentLoaded',()=>{
    
    startCountdown()
})

function pagerefresh(){
    main.innerHTML = ''
}

function getDrinkName() {

    const searchText = document.querySelector('.searchText').value;

    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.drinks);


        if(data.drinks == null){
            alert("Drink not found.")
            return;
        }else{
            let chosenDrink = document.querySelector('#drinkThumbnail')
            chosenDrink.src = data.drinks[0].strDrinkThumb

            let chosenDrinkName = document.querySelector('.drinkName');
            chosenDrinkName.innerHTML = data.drinks[0].strDrink;

          
            let chosenDrinkInstructions = document.querySelector('.drinkInstructions');
            chosenDrinkInstructions.innerHTML = data.drinks[0].strInstructions.split(' ').join('');

        
            let chosenDrinkIngredients = document.querySelector('.drinkIngredients');

            for (let i = 1; i < 15; i++) {
                if (data.drinks[0][`strIngredient${i}`] != null && data.drinks[0][`strMeasure${i}`] != null) {
                    chosenDrinkIngredients.innerHTML += `<li> ${data.drinks[0][`strMeasure${i}`]} ${data.drinks[0][`strIngredient${i}`]} </li>`;
                }
        }
    };
})
.catch(error => alert(error))

}
 
 document.querySelector('#modalDisplay').style.display = 'block';




function closeButton() {
    document.querySelector('#modalDisplay').style.display = 'none';
}

document.getElementById('searchButton').addEventListener('click', getDrinkName);
document.getElementById('closeButton').addEventListener('click', closeButton);


const newUrl = 'http://localhost:3000/Popular drinks/'
