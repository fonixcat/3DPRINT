let models = [];

fetch("data/models.json")

.then(response => response.json())

.then(data => {

models = data;

createCategories();

showFeatured();

document

.getElementById("searchBox")

.addEventListener("input", search);

});



function showFeatured(){

document

.getElementById("sectionTitle")

.innerText = "Modelos em Destaque";

const featured =

models.filter(

item => item.feature === true

);

showItems(featured);

}

function showAllModels(){

document
.getElementById("sectionTitle")
.innerText = "Todos os Modelos";

showItems(models);

}

function createCategories(){

const container =

document.getElementById(
"categories"
);

container.innerHTML = "";



container.innerHTML +=

`

<button
class="category-btn"
onclick="showFeatured()">

Destaque

</button>

<button
class="category-btn"
onclick="showAllModels()">

Todos

</button>

`;

  



const counts = {};



models.forEach(item=>{

item.categories.forEach(cat=>{

if(!counts[cat]){

counts[cat]=0;

}

counts[cat]++;

});

});



Object.keys(counts)

.sort()

.forEach(cat=>{

container.innerHTML +=

`

<button
class="category-btn"

onclick="filterCategory('${cat}')">

${cat}
(${counts[cat]})

</button>

`;

});

}



function filterCategory(category){

document

.getElementById("sectionTitle")

.innerText = category;



const filtered =

models.filter(item =>

item.categories.includes(category)

);

showItems(filtered);

}



function search(){

const text =

document

.getElementById("searchBox")

.value

.toLowerCase()

.trim();



if(text===""){

showFeatured();

return;

}



document

.getElementById("sectionTitle")

.innerText =

`Pesquisa: ${text}`;



const filtered =

models.filter(item =>

item.title

.toLowerCase()

.includes(text)

||

item.description

.toLowerCase()

.includes(text)

||

item.categories.some(cat =>

cat

.toLowerCase()

.includes(text)

)

);



showItems(filtered);

}



function showItems(items){

const gallery =

document.getElementById(
"gallery"
);

gallery.innerHTML = "";



items.forEach(item=>{

const card =

document.createElement("div");

card.className = "card";



card.innerHTML =

`

<img src="${item.images[0]}">

<div class="card-content">

<h3>${item.title}</h3>

<p>${item.description}</p>

<div>

${item.categories

.map(cat=>

`<span class="tag">${cat}</span>`

)

.join("")}

</div>

</div>

`;



card.onclick = () => {

window.location =

`item.html?id=${item.id}`;

};



gallery.appendChild(card);

});

}
