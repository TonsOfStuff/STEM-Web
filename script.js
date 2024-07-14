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
                "What is 1 + 1" : "2"
            },
            "about": {
                "about": "This is about math"
            }     
        },
        "Chemistry": {
            "questions": {
                "What is Na?": "Sodium",
                "What does H2O2 decompose into?": "H2O + O2"
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
                "What is another word for body cells?": "Somatic cells",
                "What kingdom do plants belong to?": "Plantae",
                "What kingdom do animals belong to?": "Animalia"
            },
            "about": {
                "about": "This is about biology"
            }
        }    
        
    }
}`

//UI Elements
const scoreUI = document.getElementById("score");
const questionBox = document.getElementById("questionBox");
const inputBox = document.getElementById("answerBox");
const submitButton = document.getElementById("submit");
const questionForm = document.getElementById("main");
const questionContainer = document.getElementById("questionContainer");
const startButtonContainer = document.getElementById("startButtonContainer");
const rightOrWrongText = document.getElementById("rightOrWrongText");
const aboutSection = document.getElementById("aboutSection");
const startButton = document.getElementById("startButton")


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

let chosenQuestion = null;
let chosenAnswer = null;

let amountOfQuestions = null;
let numOfQuestionsAnsweredCorrect = 0;

const mostRecentQueue = [];


//On start update the buttons to match most recent clicks
for (let i = 0; i < 6; i++){
    mostRecentQueue.push(Object.keys(categories)[i])
}

//I could add this into a loop but I don't feel like it rn
function updateButtonForQueue(){
    categoryButtonA.innerText = mostRecentQueue[0];
    categoryButtonB.innerText = mostRecentQueue[1];
    categoryButtonC.innerText = mostRecentQueue[2];
    categoryButtonD.innerText = mostRecentQueue[3];
    categoryButtonE.innerText = mostRecentQueue[4];
    categoryButtonF.innerText = mostRecentQueue[5];

    categoryButtonA.parentElement.onclick = function () { getCategory(mostRecentQueue[0]); };
    categoryButtonB.parentElement.onclick = function () { getCategory(mostRecentQueue[1]); };
    categoryButtonC.parentElement.onclick = function () { getCategory(mostRecentQueue[2]); };
    categoryButtonD.parentElement.onclick = function () { getCategory(mostRecentQueue[3]); };
    categoryButtonE.parentElement.onclick = function () { getCategory(mostRecentQueue[4]); };
    categoryButtonF.parentElement.onclick = function () { getCategory(mostRecentQueue[5]); };
}

updateButtonForQueue();




function updateScore(){
    scoreUI.innerText = numOfQuestionsAnsweredCorrect + "/" + amountOfQuestions;
}

//Functions
function getCategory(category){
    startButtonContainer.style.display = "block";
    questionContainer.style.display = "none";
    rightOrWrongText.innerText = ""

    
    sessionStorage.clear();
    numOfQuestionsAnsweredCorrect = 0;
    updateScore();

    let removedItem = mostRecentQueue.splice(mostRecentQueue.indexOf(category), 1);
    if (removedItem == []){
        mostRecentQueue.pop();
    }
    mostRecentQueue.unshift(category) //Adds to front of queue
    updateButtonForQueue();

    chosenCategory = categories[category]["questions"];
    chosenCategoryAbout = categories[category]["about"]["about"];

    aboutSection.innerText = chosenCategoryAbout;
    
    //Update score counter
    amountOfQuestions = Object.keys(chosenCategory).length;
    scoreUI.innerText = numOfQuestionsAnsweredCorrect + "/" + amountOfQuestions;


    //Insert every question into the session storage
    for (let i = 0; i < amountOfQuestions; i++){
        sessionStorage.setItem(Object.keys(chosenCategory)[i], Object.values(chosenCategory)[i])
    }

    chooseQuestion();
}

function chooseQuestion(){
    if (sessionStorage.length === 0){
        submitButton.innerText = "Restart"
        submitButton.onclick = resetCategory;
        questionBox.innerText = "Out of questions!";
    }
    else{
        inputBox.value = null;
        const randomQuestionNum = Math.floor(Math.random() * Object.keys(sessionStorage).length);
        chosenQuestion = Object.keys(sessionStorage)[randomQuestionNum];
        chosenAnswer = Object.values(sessionStorage)[randomQuestionNum];
        
        //Output question onto screen
        questionBox.innerText = chosenQuestion;
    
        //Remove from session storage
        sessionStorage.removeItem(chosenQuestion)
    }
    

}


function submitAnswer(){
    if (chosenAnswer.toLowerCase() === inputBox.value.toLowerCase()){
        numOfQuestionsAnsweredCorrect += 1;
        rightOrWrongText.innerText = "Right"
        rightOrWrongText.style.color = "#00d100"
        updateScore();
        chooseQuestion();
    }
    else{
        rightOrWrongText.innerText = "Wrong"
        rightOrWrongText.style.color = "red"
        chooseQuestion();
    }
}




function resetCategory(){
    //Reset session once its on the last question
    if (sessionStorage.length === 0){
        for (let i = 0; i < amountOfQuestions; i++){
            sessionStorage.setItem(Object.keys(chosenCategory)[i], Object.values(chosenCategory)[i])
        }

        rightOrWrongText.innerText = "";


        numOfQuestionsAnsweredCorrect = 0;
        updateScore();

        submitButton.innerText = "Submit";
        submitButton.onclick = submitAnswer;
        

        chooseQuestion();
    }
    

}

if (startButton !== null){
    startButton.addEventListener('click', function (){
        questionContainer.style.display = "block";
        startButtonContainer.style.display = "none";
    })
}
    
