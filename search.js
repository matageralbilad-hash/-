function smartSearch(){

const value =

document
.getElementById(
"searchInput"
)
.value
.trim()
.toLowerCase();

const resultsBox =

document
.getElementById(
"searchResults"
);

resultsBox.innerHTML="";

if(!value){

resultsBox.style.display="none";

return;

}

const results =

SEARCH_INDEX.filter(item =>

item.title

.toLowerCase()

.includes(value)

||

item.keywords.some(

k =>

k.includes(value)

)

);

resultsBox.style.display="block";

if(results.length===0){

resultsBox.innerHTML=

"<div class='result'>لا توجد نتائج</div>";

return;

}

results.forEach(item=>{

resultsBox.innerHTML += `

<div
class="result"
onclick="goSearch('${item.url}')">

${item.title}

</div>

`;

});

}

function goSearch(url){

window.location.href=url;

}