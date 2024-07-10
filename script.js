const questionBank = `{
    "categories": {
        "physics": {
            "questions": {
                "What is the force of gravity in newtons?": "9.8"
            },
            "about": {
                "about": "This is about physics"
            }
        },
        "math": {
            "questions": {
                "What is 1 + 1" : "2"
            },
            "about": {
                "about": "This is about math"
            }     
        },
        "chemistry": {
            "questions": {
                "What is Na?": "Sodium",
                "What does H2O2 decompose into?": "H2O + O2"
            },
            "about": {
                "about": "This is about chemistry"
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
const startButton = document.getElementById("startButton");
const rightOrWrongText = document.getElementById("rightOrWrongText");
const aboutSection = document.getElementById("aboutSection");


//Everything else
const categories = JSON.parse(questionBank)["categories"];
let chosenCategory = null;
let chosenCategoryAbout = "Quiz website!";

let chosenQuestion = null;
let chosenAnswer = null;

let amountOfQuestions = null;
let numOfQuestionsAnsweredCorrect = 0;






function updateScore(){
    scoreUI.innerText = numOfQuestionsAnsweredCorrect + "/" + amountOfQuestions;
}

//Functions
function getCategory(category){
    startButton.style.display = "block";
    questionContainer.style.display = "none";
    rightOrWrongText.innerText = ""

    
    localStorage.clear();
    numOfQuestionsAnsweredCorrect = 0;
    updateScore();

    chosenCategory = categories[category]["questions"];
    chosenCategoryAbout = categories[category]["about"]["about"];

    aboutSection.innerText = chosenCategoryAbout;
    
    //Update score counter
    amountOfQuestions = Object.keys(chosenCategory).length;
    scoreUI.innerText = numOfQuestionsAnsweredCorrect + "/" + amountOfQuestions;


    //Insert every question into the local storage
    for (let i = 0; i < amountOfQuestions; i++){
        localStorage.setItem(Object.keys(chosenCategory)[i], Object.values(chosenCategory)[i])
    }

    chooseQuestion();
}

function chooseQuestion(){
    if (localStorage.length === 0){
        submitButton.innerText = "Restart"
        submitButton.onclick = resetCategory;
        questionBox.innerText = "Out of questions!";
    }
    else{
        inputBox.value = null;
        const randomQuestionNum = Math.floor(Math.random() * Object.keys(localStorage).length);
        chosenQuestion = Object.keys(localStorage)[randomQuestionNum];
        chosenAnswer = Object.values(localStorage)[randomQuestionNum];
        
        //Output question onto screen
        questionBox.innerText = chosenQuestion;
    
        //Remove from local storage
        localStorage.removeItem(chosenQuestion)
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
    //Reset localstorage once its on the last question
    if (localStorage.length === 0){
        for (let i = 0; i < amountOfQuestions; i++){
            localStorage.setItem(Object.keys(chosenCategory)[i], Object.values(chosenCategory)[i])
        }

        rightOrWrongText.innerText = "";


        numOfQuestionsAnsweredCorrect = 0;
        updateScore();

        submitButton.innerText = "Submit";
        submitButton.onclick = submitAnswer;
        

        chooseQuestion();
    }
    

}


document.getElementById("startButton").addEventListener('click', function (){
    questionContainer.style.display = "block";
    startButton.style.display = "none";
})