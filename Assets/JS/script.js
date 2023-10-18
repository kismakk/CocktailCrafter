const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", searchCocktail);
let cocktails = [];

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
                ingredientsOutput += `<li>${ingredient}</li>`;
            });

            console.log(ingredients); 
            output += `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${drink.strDrink}</h3>
                </div>
                <div class="card-body">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="card-img-top">
                    ${ingredientsOutput}
                    <p class="card-text">${drink.strInstructions}</p>
                </div>
            </div>
            `;
        });
        document.getElementById('search-results').innerHTML = output;
    }
}

async function searchCocktail(e) {
    e.preventDefault();
    let value = document.getElementById('search-input').value;
    console.log(value);
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    UI.displayDrinks(data);
}

