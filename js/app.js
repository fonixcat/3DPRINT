let models = [];

fetch("data/models.json")
.then(res => res.json())
.then(data => {

models = data;

showItems(models);

document
.getElementById("searchBox")
.addEventListener("input", search);

});

function search(){

let text =
document
.getElementById("searchBox")
.value
.toLowerCase();

let filtered =
models.filter(item =>

item.title.toLowerCase().includes(text)

||

item.description.toLowerCase().includes(text)

||

item.categories.some(cat =>
cat.toLowerCase().includes(text)
)

);

showItems(filtered);

}

function showItems(items){

const gallery =
document.getElementById("gallery");

gallery.innerHTML="";

items.forEach(item=>{

const card =
document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${item.images[0]}">

<div class="card-content">

<h3>${item.title}</h3>

<p>${item.description}</p>

<div class="tags">

${item.categories
.map(c=>`<span class="tag">${c}</span>`)
.join("")}

</div>

</div>

`;

card.onclick=()=>{
window.location=
`item.html?id=${item.id}`;
};

gallery.appendChild(card);

});

}