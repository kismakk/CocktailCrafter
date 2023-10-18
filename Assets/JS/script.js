const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", searchCocktail);
let cocktails = [];

document.addEventListener("DOMContentLoaded", getAllDrinks); // TODO: fix this, fires up every page load

class UI {

    static displayDrinks(data) {
        cocktails = data.drinks;
        console.log(cocktails);
        let output = '';
        cocktails.forEach(drink => {

            let ingredients = [];
            for (let i = 1; i <= 15; i++) {
                if (drink[`strIngredient${i}`]) {
                    if (drink[`strMeasure${i}`]) {
                        ingredients.push(` ${drink[`strMeasure${i}`]} ${drink[`strIngredient${i}`]}`);
                        continue;
                    }
                }
            }
            
            let ingredientsOutput = '';
            ingredients.forEach(ingredient => {
                ingredientsOutput += `<li class="card-text">${ingredient}</li>`;
            });

            console.log(ingredients); 
            output += `
            <div class="col-md-4 mb-3"> 
                <div class="card">
                    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="Drink">
                    <div class="card-body">
                        <h5 class="card-title">${drink.strDrink}</h5>
                        <a href="#" class="btn btn-danger btn-sm">See more</a>
                    </div>
                </div>
            </div>    
            `;
        });
        document.getElementById('search-results').innerHTML = output;
    }
    // TODO: error message rendering
}

async function searchCocktail(e) {
    e.preventDefault();
    console.log(searchBtn);
    let value = document.getElementById('search-input').value;
    console.log(value);
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    UI.displayDrinks(data);
}

async function getAllDrinks() {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    UI.displayDrinks(data);
}

// TODO: clicking see more brings out modal with more info

