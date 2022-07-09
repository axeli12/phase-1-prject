document.addEventListener('DOMContentLoaded',()=>{
    
    //startCountdown()
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

const main = document.getElementById('main')
const viewDrinks = document.getElementById('view')


document.getElementById('searchButton').addEventListener('click', getDrinkName);
document.getElementById('closeButton').addEventListener('click', closeButton);
viewDrinks.addEventListener('click', getDrinks)

const newUrl = "http://localhost:3000/Populardrinks"

function getDrinks(){
    fetch(newUrl)
    .then (res=>res.json())
    .then(pagerefresh())
    .then(data=>data.forEach(drink=>loadDrink(drink)))
        
    }
   

    function loadDrink(drinkObj){
        const drink = document.createElement('ul')
        console.log(drink)
        drink.id = `${drinkObj.id}`
        drink.className = 'drink'
        drink.innerHTML = `
        <img src = "${drinkObj.image}" class="dirnk-pic"/>
        <div class = "drink-info">
            <p>${drinkObj.name}</p>
            <p>${drinkObj.recipe}</p>
            <p>
            <p>
            likes: $<span class="liked-times">${drinkObj.likes}</span> 
            </p>
            </div>

            <div class="buttons">
            <button id ="like"> like Me </button>
            </div>
        `
        main.appendChild(drink)
        drink.querySelector('#like').addEventListener('click', () => {
            drinkObj.likes +=5
            drink.querySelector('span').textContent = drinkObj.likes
           
        })
        
    }

