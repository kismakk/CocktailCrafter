const URL = window.location.href;
const searchBtn = document.getElementById("search-submit");
let cocktails = [];
let cocktail = '';

if (URL.includes("search.html")) {
    searchBtn.addEventListener("click", getCocktail);
    document.addEventListener("DOMContentLoaded", getAllDrinks);
}
else document.addEventListener("DOMContentLoaded", getRandomDrink);

class UI {

    static displaySearchedDrinks(data) {
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
    
    static displayAllDrinks(data) {
        cocktails = data.drinks;
        console.log(cocktails);
        let output = '';
        cocktails.forEach(drink => {
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
    };

    static displayRandomDrink(data) {
        cocktail = data.drinks;
        console.log(cocktail);
        let ingredients = [];
        cocktail.forEach(cocktail => {
            for (let i = 1; i <= 15; i++) {
                if (cocktail[`strIngredient${i}`]) {
                    if (cocktail[`strMeasure${i}`]) {ingredients.push(` ${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
                        continue;
                        }
                }
            }
        });

        let ingredientsOutput = '';
        ingredients.forEach(ingredient => {
            ingredientsOutput += `<li class="card-text">${ingredient}</li>`;
        });

        console.log(ingredients, cocktail.strDrinkThumb, cocktail.strDrink, cocktail.strInstructions);

        let output = '';
        cocktail.forEach(cocktail => {
            output += `
             <div class="card mb-3 w-50 mx-auto">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${cocktail.strDrinkThumb}" class="img-fluid rounded-start" alt="Random cocktail">
                </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${cocktail.strDrink}</h5>
                    <p class="card-text">${ingredientsOutput}</p>
                    <p class="card-text"><small class="text-muted">${cocktail.strInstructions}</small></p>
                 </div>
            </div>
        </div>
      </div>
        `;
        console.log(output);
        document.getElementById('cocktail-card-home').innerHTML = output
        });
    }
}

class Error {

    static errorClass = 'alert alert-danger d-flex align-items-center w-50 mx-auto';

    static displaySearchError() {
        const div = document.createElement('div');
        div.className = this.errorClass;
        div.appendChild(document.createTextNode('Something went wrong, please try again later.'));
        const container = document.querySelector('#search-container');
        if (URL.includes("search.html")) {
            const search = document.querySelector('#search-results');
            container.insertBefore(div, search);
            setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }
        else {
            document.getElementById('cocktail-card-home').innerHTML = output;
        } 


        
    }

    static inputError() {
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('Please enter a cocktail name.'));
        const container = document.querySelector('#input-container');
        console.log(container);
        const input = document.querySelector('#input-form');
        console.log(input);
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static noCocktailError() {
        const div = document.createElement('div');
        div.className = this.errorClass;
        div.appendChild(document.createTextNode('Sorry, no cocktail with that name was found.'));
        const container = document.querySelector('#input-container'); 
        const input = document.querySelector('#input-form');
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

async function getCocktail(e) {
    e.preventDefault();
    console.log(searchBtn);
    let value = document.getElementById('search-input').value;
    console.log(value);
    if (value === '') {
        Error.inputError();
    }
    else {
        try {
            let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
            console.log(url);
            let response = await fetch(url);
            let data = await response.json();
            if (data.drinks === null) {
                Error.noCocktailError();
                return;
            }
            console.log(data);
            UI.displaySearchedDrinks(data);
        }
        catch (error) {
            console.log(error);
            Error.displaySearchError();
        }
    }
}

async function getAllDrinks() {
    try {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        UI.displayAllDrinks(data);
    }
    catch (error) {
        console.log(error);
        Error.displaySearchError();
    }
}

async function getRandomDrink() {
    try {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        UI.displayRandomDrink(data);
    }
    catch (error) {
        console.log(error);
        Error.displaySearchError();
    }
}

// TODO: clicking see more brings out modal with more info