const accessKey ="hWWAR2c5TOnJ6v2KHKv-aAbpiF9aPDHBsx1h1vqgM_0";
const form= document.querySelector("form");
const inputEl = document.getElementById("searchInput");  // will be in the form of a object   -> key-value pair
const searchResults = document.querySelector(".searchResults");
const showMore= document.querySelector(".showMore");

let inputdata="";
let page=1;

async function searchImages(){
    inputdata=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`;
    const response= await fetch(url);
    const data= await response.json();

    const results=data.results;

    if(page == 1)
    {
        searchResults.innerHTML="";
    }

    results.map((result)=>{
        const imagewrapper=document.createElement("div");
        imagewrapper.classList.add("searchResult");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink);
        searchResults.appendChild(imagewrapper);
    });
    page++
    if(page>1)
    {
        showMore.style.display="block";
    }
}
form.addEventListener("submit",(event)=>
{
    event.preventDefault();
    page=1;
    searchImages()
});
showMore.addEventListener("click",(event)=>
{
    searchImages()
});