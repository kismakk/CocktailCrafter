const URL = window.location.href;
const searchBtn = document.getElementById("search-submit");

class CocktailDB {
    static async fetchAPI(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
            Error.displaySearchError();
            return null;
        }
    }

    static async searchByName(value) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
        return await this.fetchAPI(url);
    }

    static async searchAll() {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
        return await this.fetchAPI(url);
    }

    static async getRandom() {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        return await this.fetchAPI(url);
    }
}

class CocktailUI {

    static displayDrinks(data) {
        let cocktails = data.drinks;
        let output = '';
    
        cocktails.forEach(cocktail => {
            let ingredients = [];
            for (let i = 1; i <= 15; i++) {
                if (cocktail[`strIngredient${i}`]) {
                    if (cocktail[`strMeasure${i}`]) {
                        ingredients.push(`${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
                    } else {
                        ingredients.push(cocktail[`strIngredient${i}`]);
                    }
                } else {
                    break;
                }
            }
    
            let ingredientsOutput = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    
            output += `
            <div class="col-md-4 mb-3"> 
                <div class="card">
                    <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="Drink">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <div class="scrollable">
                            <p class="card-text">
                                <ul>${ingredientsOutput}</ul>
                            </p>
                            <p class="card-text"><small class="text-muted">${cocktail.strInstructions}</small></p>
                        </div>
                    </div>
                </div>
            </div>`;
        });
    
        document.getElementById('search-results').innerHTML = output;
    }
    

    static displayRandomDrink(data) {
        let cocktail = data.drinks[0]; 
        let ingredients = [];
        for (let i = 1; i <= 15; i++) {
            if (cocktail[`strIngredient${i}`]) {
                if (cocktail[`strMeasure${i}`]) {
                    ingredients.push(`${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
                } else {
                    ingredients.push(cocktail[`strIngredient${i}`]);
                }
            } else {
                break;
            }
        }
    
        let ingredientsOutput = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    
        let output = `
        <div class="card mb-3 w-50 mx-auto">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${cocktail.strDrinkThumb}" class="img-fluid rounded-start" alt="Random cocktail">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <div class="scrollable">
                            <p class="card-text">
                                <ul>${ingredientsOutput}</ul>
                            </p>
                            <p class="card-text"><small class="text-muted">${cocktail.strInstructions}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    
        document.getElementById('card-container').innerHTML = output;
    }
    
}

class ErrorHandler {
    static errorClass = 'alert alert-danger center-block w-50 mx-auto';

    static databaseError() {
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('Something went wrong. Please try again.'));
        if (URL.includes("search.html")) {
            const container = document.querySelector('#search-container');
            console.log(container);
            const search = document.querySelector('#search-form');
            console.log(search);
            container.insertBefore(div, search);
            setTimeout(() => document.querySelector('.alert').remove(), 5000);
        }
        else {
            const section = document.querySelector('#card-section');
            console.log(section);
            const card = document.querySelector('#card-container');
            console.log(card);
            section.insertBefore(div, card);
            setTimeout(() => document.querySelector('.alert').remove(), 5000);
        }

    }

    // TODO: Fix repetition on inputError and noCocktailError -> new function

    static inputError() {
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('Input field is empty.'));
        const container = document.querySelector('#input-container');
        console.log(container);
        const input = document.querySelector('#input-form');
        console.log(input);
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static noCocktailError() {
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('No cocktail found.'));
        const container = document.querySelector('#input-container');
        console.log(container);
        const input = document.querySelector('#input-form');
        console.log(input);
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

class EventHandler {
    static async getCocktail(e) {
        e.preventDefault();
        const input = document.getElementById("search-input").value;
        if (input === '') {
            ErrorHandler.inputError();
        } else {
            try {
                console.log("Getting cocktail");
                const data = await CocktailDB.searchByName(input);

                if (data.drinks === null) {
                    console.log(data);
                    ErrorHandler.noCocktailError();
                    return;
                }
                CocktailUI.displayDrinks(data);
            }
            catch {
                ErrorHandler.databaseError();
            }
        }
    }

    static async getAllDrinks() {
        try {
            console.log("Getting all drinks");
            const data = await CocktailDB.searchAll();
            console.log(data);
            CocktailUI.displayDrinks(data);
        }
        catch {
            ErrorHandler.databaseError();
        }
    }

    static async getRandomDrink() {
        try {
            console.log("Getting random drink");
            const data = await CocktailDB.getRandom();
            console.log(data);
            CocktailUI.displayRandomDrink(data);
        }
        catch {
            ErrorHandler.databaseError();
        }
    }
}

if (URL.includes("search.html")) {
    searchBtn.addEventListener("click", EventHandler.getCocktail);
    document.addEventListener("DOMContentLoaded", EventHandler.getAllDrinks);
} else {
    document.addEventListener("DOMContentLoaded", EventHandler.getRandomDrink);
}

// TODO: Filtering by ingredient(s)