const questionBank = `{
    "categories": {
        "Physics": {
            "questions": {
                "What is the force of gravity in newtons?": "9.8"
            },
            "about": {
                "about": "This is about physics"
            }
        },
        "Math": {
            "questions": {
                "What is 1 + 1" : "2",
                "What is 5 * 2" : [["3", "10", "4", "7"], "10"]
            },
            "about": {
                "about": "This is about math"
            }     
        },
        "Chemistry": {
            "questions": {
                "What is Na?": "Sodium",
                "What does H2O2 decompose into?": [["H2O + O2", "H2O", "O2", "H + O2"], "H2O + O2"]
            },
            "about": {
                "about": "This is about chemistry"
            }
        },
        "Material Science": {
            "questions": {
                "What type of material is concrete?": "composite",
                "What are polymers made up of": "Monomers"
            },
            "about": {
                "about": "This is about material science"
            }
        },
        "Astronomy": {
            "questions": {
                "What element is most abundant in stars?": "Hydrogen",
                "What is the B-V index of a star with B = 3 and V = 2": "1"
            },
            "about": {
                "about": "This is about astronomy"
            }
        },
        "Biology": {
            "questions": {
                "What is another word for body cells?": [["Somatic Cells", "Gametic Cells", "Skin Cells", "Human cells"], "Somatic Cells"],
                "What kingdom do plants belong to?": "Plantae",
                "What kingdom do animals belong to?": "Animalia",
                "What is the jaw bone's name?": "Mandible",
                "How many chromosomes in a human cell?": "46",
                "True or false: Viruses are living beings": "False",
                "What are the finger/toe bones called?": "Phalanges",
                "What helps Oxygen stick to blood?": "Hemoglobin",
                "Is DNA positive or negatively charged?": "Negatively",
                "How many bones are in the human body?": "206",
                "How many cells are produced from meiosis?": "4",
                "What is the method called where bacteria reproduce by translating DNA from pilli?": "Conjugation",
                "What is the phase in mitosis where chromosomes line up on the equator of the cell?": "Metaphase"

            },
            "about": {
                "about": "This is about biology"
            }
        },
        "History": {
            "questions": {
                "When did WWII end?": "1945",
                "What is the last name of the US' 16th president?": "Lincoln"
            },
            "about": {
                "about": "This is about history"
            }
        },
        "Spanish": {
            "questions": {
                "Que es rana en ingles?": "Frog",
                "Que es sin embargo en ingles?": "However",
                "Estar conjugated into the preterite yo form?": "Estuve"
            },
            "about": {
                "about": "This is about spanish"
            }
        }
    }
}`

//UI Elements
const scoreUI = document.getElementById("scoreUI");
const questionBox = document.getElementById("questionBox");
const inputBox = document.getElementById("answerBox");
const submitButton = document.getElementById("submit");
const questionForm = document.getElementById("main");
const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("form");
const startButtonContainer = document.getElementById("startButtonContainer");
const aboutSection = document.getElementById("aboutSection");
const startButton = document.getElementById("startButton");
const scrollBar = document.getElementsByClassName("scrollWatcher");
const selectNumOfQuestions = document.getElementById("selectNumOfQuestions");


const categoryButtonA = document.getElementById("categoryButtonA");
const categoryButtonB = document.getElementById("categoryButtonB");
const categoryButtonC = document.getElementById("categoryButtonC");
const categoryButtonD = document.getElementById("categoryButtonD");
const categoryButtonE = document.getElementById("categoryButtonE");
const categoryButtonF = document.getElementById("categoryButtonF");



//Everything else
const categories = JSON.parse(questionBank)["categories"];
let chosenCategory = null;
let chosenCategoryAbout = "Quiz website!";

let questionsList = [];
let answerList = [];

let chosenQuestion = null;
let chosenAnswer = null;

let amountOfQuestions = null;
let numOfQuestionsAnsweredCorrect = 0;

let numOfQuestions = 0;

const mostRecentQueue = [];


//Save category chosen from previous page
let savedCategory = window.name;
if (document.URL.includes("test.html") === false){
    savedCategory = null;
}


//On start update the buttons to match most recent clicks
for (let i = 0; i < 6; i++){
    mostRecentQueue.push(Object.keys(categories)[i])
}

function redirectTest(type){
    window.name = type;
    window.location.replace("test.html");
}

//I could add this into a loop but I don't feel like it rn
function updateButtonForQueue(){
    categoryButtonA.innerText = mostRecentQueue[0];
    categoryButtonB.innerText = mostRecentQueue[1];
    categoryButtonC.innerText = mostRecentQueue[2];
    categoryButtonD.innerText = mostRecentQueue[3];
    categoryButtonE.innerText = mostRecentQueue[4];
    categoryButtonF.innerText = mostRecentQueue[5];

    categoryButtonA.parentElement.onclick = function () { redirectTest(mostRecentQueue[0]); };
    categoryButtonB.parentElement.onclick = function () { redirectTest(mostRecentQueue[1]); };
    categoryButtonC.parentElement.onclick = function () { redirectTest(mostRecentQueue[2]); };
    categoryButtonD.parentElement.onclick = function () { redirectTest(mostRecentQueue[3]); };
    categoryButtonE.parentElement.onclick = function () { redirectTest(mostRecentQueue[4]); };
    categoryButtonF.parentElement.onclick = function () { redirectTest(mostRecentQueue[5]); };
}

updateButtonForQueue();

//Run at start of test.html
if (savedCategory !== null){
    getCategory(savedCategory);
}

//Functions
function getCategory(category){
    numOfQuestionsAnsweredCorrect = 0;

    let removedItem = mostRecentQueue.splice(mostRecentQueue.indexOf(category), 1);
    if (removedItem == []){
        mostRecentQueue.pop();
    }
    mostRecentQueue.unshift(category) //Adds to front of queue
    updateButtonForQueue();


    chosenCategory = categories[category]["questions"];
    chosenCategoryAbout = categories[category]["about"]["about"];

    aboutSection.innerText = chosenCategoryAbout;
}

function getQuestions(){
    //Update score counter by factoring in user input
    if (numOfQuestions <= 0 || numOfQuestions === null || numOfQuestions > Object.keys(chosenCategory).length){
        amountOfQuestions = Object.keys(chosenCategory).length;
    }else{
        amountOfQuestions = numOfQuestions;
    }
    
    scoreUI.innerText = "0/" + amountOfQuestions.toString();

    let allPossibleQuestions = Object.keys(chosenCategory)
    let allPossibleAnswers = Object.values(chosenCategory)
    shuffle(allPossibleQuestions)
    shuffle(allPossibleAnswers)
    

    //Insert every question into question list  ------------- Randomize questions here
    for (let i = 0; i < amountOfQuestions; i++){
        questionsList.push(allPossibleQuestions[i]);
        answerList.push(allPossibleAnswers[i]);
    }
}


if (startButton !== null){
    startButton.addEventListener('click', function (){
        form.style.display = "block";
        startButtonContainer.style.display = "none";
        //scrollBar.style.display = "block";
        numOfQuestions = selectNumOfQuestions.value;
        getQuestions();
        createQuestions();
    })
}
    
