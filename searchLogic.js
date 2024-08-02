

//Parse all possible topics
let possibleSubj = [];

const searchBar = document.getElementById("searchBarInput");
const mainDiv = document.getElementById('searchMain');

Object.keys(categories).forEach(element => {
    possibleSubj.push(element)
    const originalDiv = document.getElementById("referenceDiv");



    const containerDiv = document.createElement("div");
    containerDiv.className = "optionClass";
    const subjectTitle = document.createTextNode(element);

    containerDiv.appendChild(subjectTitle);
    mainDiv.insertBefore(containerDiv, originalDiv);

    containerDiv.addEventListener("click", function(){
        console.log(element)
        window.name = element;
        window.location.replace("test.html");
    })
});


searchBar.addEventListener("input", function () {
    let searchingForText = searchBar.value;
    for (let i = 0; i < mainDiv.childElementCount; i++){
        if (mainDiv.children[i].textContent.toLowerCase().includes(searchingForText.toLowerCase())){
            mainDiv.children[i].style.display = "block";
        }else{
            mainDiv.children[i].style.display = "none";
        }
    }
})