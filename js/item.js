const params =
new URLSearchParams(
window.location.search
);

const id = params.get("id");

fetch("data/models.json")
.then(res=>res.json())
.then(data=>{

const item =
data.find(x=>x.id===id);

showItem(item);

});

function showItem(item){

const container =
document.getElementById(
"itemContainer"
);

container.innerHTML =

`
<div class="item-page">

<h1>${item.title}</h1>

<img
id="mainImage"
class="main-image"
src="${item.images[0]}"
>

<p>${item.description}</p>

<h3>Categorias</h3>

${item.categories.join(", ")}

<div class="thumb-container">

${item.images.map(img=>`

<img
class="thumb"
src="${img}"
onclick="
document
.getElementById('mainImage')
.src='${img}'
">

`).join("")}

</div>

</div>
`;

}