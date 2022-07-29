const main = document.getElementById('main')
const viewDrinks = document.getElementById('view')
const newDrink = document.getElementById('newDrink')

document.getElementById('drink-form').addEventListener('submit', newDrinkObj)
document.getElementById('searchButton').addEventListener('click', getDrinkName);
document.getElementById('closeButton').addEventListener('click', closeButton);
document.getElementById('demo').addEventListener("keypress", myFunction)
viewDrinks.addEventListener('click', getDrinks)

const newUrl = "http://localhost:3000/drink"

//function for keypress eventlistner
function myFunction(){
    document.getElementById("demo").style.background = "pink"
}


function pagerefresh(){ 
    main.innerHTML = ''
}

// loads api data
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
            chosenDrinkName.innerText = data.drinks[0].strDrink;

          
            let chosenDrinkInstructions = document.querySelector('.drinkInstructions');
            chosenDrinkInstructions.innerText = data.drinks[0].strInstructions

        
            let chosenDrinkIngredients = document.querySelector('.drinkIngredients');

            for (let i = 1; i < 15; i++) {
                if (data.drinks[0][`strIngredient${i}`] != null && data.drinks[0][`strMeasure${i}`] != null) {
                    chosenDrinkIngredients.innerHTML += `<li> ${data.drinks[0][`strMeasure${i}`]} ${data.drinks[0][`strIngredient${i}`]} </li>`;
                }
        }
    };
})
.catch(error => alert(error))


document.querySelector('#modalDisplay').style.display = 'block';

}
 
function closeButton() {
    document.querySelector('#modalDisplay').style.display = 'none';
}

//adds new drink to db.json
function newDrinkObj(e){
    e.preventDefault()
    let newDrinkObj = {
        name:e.target.name.value,
        image:e.target.image.value,
        recipe:e.target.recipe.value,
        likes: 0
    
    }
    loadDrink(newDrinkObj)
    addNewDrink(newDrinkObj)
    document.querySelector('#drink-form').reset()
}

//renders drinks
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
            likes: <span class= liked-times >${drinkObj.likes}</span> 
            </p>
            </div>

            <div class="buttons" button id = "like">
            <button = #like > like Me </button>
            </div>
        `
        main.appendChild(drink)

        drink.querySelector('#like').addEventListener('click', () => {
            drinkObj.likes +=1
            drink.querySelector('span').textContent = drinkObj.likes
            updateLikes(drink)
           
        })
    }
    //fucntion to add and update likes
    
    function updateLikes(drinkObj){
        fetch(`http://localhost:3000/drink/${drinkObj.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(drinkObj)
        })
        .then(res => res.json())
        .then(drink => console.log(drink))
    }

        
    

    // adding new drink
function addNewDrink(newDrinkObj){
    fetch(`http://localhost:3000/drink`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(newDrinkObj)
    })
    .then(res => res.json())
    .then(drink => console.log(drink))
}

//to close search result
function closeButton() {
    document.querySelector('#modalDisplay').style.display = 'none';
}

//copy button to cop contents from search
const copyButton = document.getElementById('btn-copy')
copyButton.addEventListener('click', async (event) =>{
    const content = document.getElementById('copying').textContent
    await navigator.clipboard.writeText(content)
    const copied = await navigator.clipboard.readText()
    console.log(copied)
})


