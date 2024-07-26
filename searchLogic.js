

//Parse all possible topics
let possibleSubj = [];

Object.keys(categories).forEach(element => {
    possibleSubj.push(element)
    const mainDiv = document.getElementById("searchMain");
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



