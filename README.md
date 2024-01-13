# Cocktail Crafter
Visit the website here: [Cocktail Crafter](https://cocktailcrafter.pages.dev)

## About

Cocktail Crafter is a website made for users to search for all kinds of cocktails.

Website is made with JS/HTML/CSS and Bootstrap, and is powered by [free Cocktail API](https://www.thecocktaildb.com/api.php).

Website is a final assignment for "Frontend Web Development" course in Oulu University of Applied Sciences.

<details closed>
<summary>
  Requirements for course and implementation
</summary> <br />

### HTML
- [x] _Basic HTML structure is present._
- [x] _HTML structure with clear content differentiation (headings, paragraphs, lists)._
- [x] _Use of forms, links, and media._
- [x] _Tables are effectively used._
- [x] _Consistent use of semantic HTML throughout, ensuring better structure and understanding of the content._ 

Semantic tags are used throughout the website e.g in Navbar and footer and the main content of the webpage. Also added metadata to make the site more SEO friendly. Couple of divs are here and there to make containers and such.

### CSS
- [x] _Basic CSS styling (colors, fonts)._
- [x] _Use of classes and IDs to style specific elements._
- [x] _Implementation of responsive design elements._
- [x] _Use of layouts for advanced user interfaces (arrays, float, flexbox, css grid)_
- [x] _Styling demonstrates a strong grasp of layout principles, aesthetics, and user experience._ 

I used Bootstrap 5 to style the website with additional animations for page loads and such. The site is responsive and scales very nicely. I used flexboxes and grids frequently for example in the "Search" page when loading in cocktails.

### Javascript Basics
- [x] _Simple interactions (like alerts on button click)._
- [x] _Multiple event listeners and basic DOM manipulations._
- [x] _Use of arrays, objects, and functions._
- [x] _Advanced logic, looping through data, and dynamic DOM updates._
- [x] _Consistent use of Object-Oriented JavaScript principles._

I refactored all the functions to their own classes as static methods that can be called when needed. This makes the code able to scale well if needed and improves the readability of the code. All the classes and their methods are commented and there's some more commenting on different methods explaining what they do.

### Asynchronous Operations
- [x] _Use of timers._
- [x] _Successful implementation of an AJAX call or Fetch._
- [x] _Data from the asynchronous call is displayed on the webpage._
- [x] _Error handling is implemented (for failed API calls, etc.)._
- [x] _Effective use of asynchronous data to enhance user experience (like filtering, sorting)._

All of the above can be found in the app.js file. Fetch is used to get information about cocktails from CocktailDB. Then, the data is filtered to only show the essential components (e.g ingredients, cocktail name etc.). Error handlers are implemented in the ErrorHandler class to display cards to show what the error is and they are timed using timers. 

</details>

