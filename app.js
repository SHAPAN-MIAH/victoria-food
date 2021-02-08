// event handler
const searchButton = document.getElementById("SearchBtn");
searchButton.addEventListener('click', getMealList);

const mealDetails = document.getElementById("mealDetails");


// get meals list
function getMealList(){
    const searchInput = document.getElementById('typeInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        const searchResult = document.getElementById("searchResult");

        let html = '';
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                  <div id="meal-document" onclick="getMealDetails(${meal.idMeal})"  data-id="${meal.idmeal}">
                    <div class="mealImg"><img src="${meal.strMealThumb}"></div>
                    <h2>${meal.strMeal}</h2>
                  </div>  
                `;
            })
        }else{
            html +=`
            <div class="errorDiv">
               <h2>Sorry, Meals didn't found!</h2>
               <p>Please try again.</p>
            </div>
            `;
            mealDetails.innerHTML = "";
        }

        searchResult.innerHTML = html;
    })
};


// get meals details.........
const getMealDetails = mealsId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsId}`)
        .then(res => res.json())
        .then(data => {
            const html = `
            
                <div id="mealContainer">
                    <img class="mealImg" src="${data.meals[0].strMealThumb}" />
                    <div class="mealDetailsDescription">
                            <h1 class="mealDetail-title">${data.meals[0].strMeal}</h1>
                            <h4 class="meal-heading">Ingredients</h4>
                       <ol class="mealDetailList">
                            <li> ${data.meals[0].strIngredient1} </li>
                            <li> ${data.meals[0].strIngredient2} </li>
                            <li> ${data.meals[0].strIngredient3} </li>
                            <li> ${data.meals[0].strIngredient4} </li>
                            <li> ${data.meals[0].strIngredient5} </li>
                            <li> ${data.meals[0].strIngredient6} </li>
                            <li> ${data.meals[0].strIngredient7} </li>
                       </ol>
                    </div>
                </div>
            
            `;
            mealDetails.innerHTML = html;
            errorDiv.innerHTML = '';
        })
};


