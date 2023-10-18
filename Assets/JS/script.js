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
                ingredientsOutput += `<li class="card-text">${ingredient}</li>`;
            });

            console.log(ingredients); 
            output += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${drink.strDrinkThumb}" class="img-fluid rounded-start" alt="${drink.strDrink}">
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${drink.strDrink}</h5>
                            <p class="card-text">${ingredientsOutput}</p>
                            <p class="card-text"><small class="text-body-secondary">${drink.strInstructions}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        document.getElementById('search-results').innerHTML = output;
    }
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

