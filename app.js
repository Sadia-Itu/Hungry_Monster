document.getElementById("searchBtn").addEventListener("click", function () {
  let mealName = document.getElementById("inputMealName").value;

  mealName = mealName.trim();

  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        
          displayFoundMeals(data.meals);
        
      });
  

  document.getElementById("inputMealName").value = "";
});

function displayFoundMeals(meals) {
  document.getElementById("mealList").innerHTML = "";
  document.getElementById("mealDetails").style.display = "none";

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="mealCard">
            <img src="${meal.strMealThumb}" class="mealImage">
            <h5 class="mealTitle">${meal.strMeal}</h5>
        </div>
        `;
    document.getElementById("mealList").appendChild(mealDiv);
  });
}


function mealDetails(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      displayMealDetails(data.meals[0]);
    });
}


function displayMealDetails(meal) {
  document.getElementById("mealDetailsDisplay").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="mealDetailsImage">
        <h3 class="mealDetailsTitle">${meal.strMeal}</h3>
    </div>
    <br>
    <div class="text-center">
        <h4 id="ingredientTitle"> Ingredients</h4>
    
         <ul id="ingredientList">
         </ul>
    </div>
    `;

  
  for (let i = 1; i <= 20; i++) 
  {
    let ingredient = "strIngredient" + i;
    let quantity = "strMeasure" + i;

    //if (meal[ingredient] === "" || meal[ingredient] == null) break;

    const li = document.createElement("li");
    li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[quantity]} ${meal[ingredient]}</li>
        `;
    document.getElementById("ingredientList").appendChild(li);
  }

  document.getElementById("mealDetails").style.display = "block";
  document.getElementById("mealDetails").scrollIntoView({ behavior: "smooth" });
}
