// Initialize variables and constants
const URL = window.location.href;
const searchBtn = document.getElementById("search-submit");

// Add a delay to the animation of each element for a staggered effect
const elements = document.querySelectorAll(".fly-in");
elements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
});

// Class for handling API calls

class CocktailDB {
    static async fetchAPI(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
            Error.databaseError();
            return null;
        }
    }

    // Different API calls for different search queries
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

// Class for handling UI and DOM manipulation

class CocktailUI {

    static displayDrinks(data) {
        let cocktails = data.drinks;
        let output = '';
        
        // Loop through each cocktail and display the ingredients in a table
        cocktails.forEach(cocktail => {
            let ingredients = [];
            for (let i = 1; i <= 15; i++) {
                if (cocktail[`strIngredient${i}`]) {
                    if (cocktail[`strMeasure${i}`]) {
                        ingredients.push({ amount: cocktail[`strMeasure${i}`], name: cocktail[`strIngredient${i}`] });
                    } else {
                        ingredients.push({ amount: '', name: cocktail[`strIngredient${i}`] });
                    }
                } else {
                    break;
                }
            }
            
            // Create a table row for each ingredient
            let ingredientsOutput = ingredients
                .map(ingredient => `<tr><td>${ingredient.amount}</td><td>${ingredient.name}</td></tr>`).join('');
            
            // Create a card for each cocktail
            output += `
            <div class="col-md-4 mb-3 fade-in">
                <div class="card">
                    <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="Drink">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <div class="scrollable">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Ingredient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${ingredientsOutput}
                                </tbody>
                            </table>
                            <p class="card-text"><small class="text-muted">${cocktail.strInstructions}</small></p>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        
        // Display the cards in the DOM
        document.getElementById('search-results').innerHTML = output;
    }    
    

    static displayRandomDrink(data) {
        let cocktail = data.drinks[0];

        // Loop through each cocktail and display the ingredients in a table
        let ingredients = [];
        for (let i = 1; i <= 15; i++) {
            if (cocktail[`strIngredient${i}`]) {
                if (cocktail[`strMeasure${i}`]) {
                    ingredients.push({ amount: cocktail[`strMeasure${i}`], name: cocktail[`strIngredient${i}`] });
                } else {
                    ingredients.push({ amount: '', name: cocktail[`strIngredient${i}`] });
                }
            } else {
                break;
            }
        }
        
        // Create a table row for each ingredient
        let ingredientsOutput = ingredients
            .map((ingredient) => `<tr><td>${ingredient.amount}</td><td>${ingredient.name}</td></tr>`).join('');
        
        // Create a card for each cocktail
        let output = `
        <div class="card mb-3 fade-in">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${cocktail.strDrinkThumb}" class="img-fluid rounded-start" alt="Random cocktail">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <div class="scrollable">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Ingredient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${ingredientsOutput}
                                </tbody>
                            </table>
                            <p class="card-text"><small class="text-muted">${cocktail.strInstructions}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Display the cards in the DOM
        document.getElementById('card-container').innerHTML = output;
    }
    
    
}

// Class for handling errors and displaying error messages

class ErrorHandler {

    // Class for styling the error messages
    static errorClass = 'alert alert-danger center-block w-50 mx-auto alert-fade';

    static databaseError() {

        // Check if an error message is already displayed
        const existingError = document.querySelector('.alert');
        if (existingError) {
            return;
        }

        // Create a div element and add the error message to it
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('Something went wrong. Please try again.'));

        // Check if the error message should be displayed on the search page or the index page
        if (URL.includes("search")) {
            const container = document.querySelector('#search-container');
            const search = document.querySelector('#search-results');
            container.insertBefore(div, search);
            setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }
        else {
            const section = document.querySelector('#card-section');
            const card = document.querySelector('#card-container');
            section.insertBefore(div, card);

            // Remove the error message after 3 seconds
            setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }

    }

    static inputError() {
        const existingError = document.querySelector('.alert');
        if (existingError) {
            return;
        }
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('Input field is empty.'));
        const container = document.querySelector('#input-container');
        const input = document.querySelector('#input-form');
        console.log(input);
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static noCocktailError() {
        const existingError = document.querySelector('.alert');
        if (existingError) {
            return;
        }
        const div = document.createElement('div');
        div.className = this.errorClass
        div.appendChild(document.createTextNode('No cocktail found.'));
        const container = document.querySelector('#input-container');
        const input = document.querySelector('#input-form');
        container.insertBefore(div, input);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Class for handling event listeners

class EventHandler {
    static async getCocktail(e) {

        // Prevent the default behaviour of the submit button
        e.preventDefault();
        const input = document.getElementById("search-input").value;

        // Validate input
        if (input === '') {
            ErrorHandler.inputError();
        } else {

            // Try to get data from the API
            try {
                const data = await CocktailDB.searchByName(input);
                
                // Check if the API returned any data
                if (data.drinks === null) {
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
            const data = await CocktailDB.searchAll();
            CocktailUI.displayDrinks(data);
        }
        catch {
            ErrorHandler.databaseError();
        }
    }

    static async getRandomDrink() {
        try {
            const data = await CocktailDB.getRandom();
            CocktailUI.displayRandomDrink(data);
        }
        catch {
            ErrorHandler.databaseError();
        }
    }
}

// Event listeners for search page and index page

if (URL.includes("search")) {
    searchBtn.addEventListener("click", EventHandler.getCocktail);
    document.addEventListener("DOMContentLoaded", EventHandler.getAllDrinks);
} else {
    document.addEventListener("DOMContentLoaded", EventHandler.getRandomDrink);
}
