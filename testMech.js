let questionsAnsweredCorrect = 0;
let previousAnsweredCorrect = 0;

const filler = document.getElementById("filler");

function updateScoreUI(){
    scoreUI.innerText = (questionsAnsweredCorrect - previousAnsweredCorrect).toString() + "/" + amountOfQuestions.toString();
}

questionsList.forEach(element => {
    const questionCon = document.createElement("div");
    const questionInput = document.createElement("input");
    const questionaire = document.createElement("div");
    const rightOrWrongTextElement = document.createElement("div");

    const rightOrWrongTextNode = document.createTextNode("");
    const questionaireText = document.createTextNode(element);

    questionCon.className = "questionContainer";

    questionInput.className = "answerBox";
    questionInput.name = "answer";
    questionInput.type = "text";

    questionaire.className = "questionBox";
    questionaire.appendChild(questionaireText);

    rightOrWrongTextElement.className = "rightOrWrongText";
    rightOrWrongTextElement.appendChild(rightOrWrongTextNode);


    questionCon.appendChild(questionaire);
    questionCon.appendChild(questionInput);
    questionCon.appendChild(rightOrWrongTextElement)
    

    form.insertBefore(questionCon, filler);
});

const allQuestionCon = document.querySelectorAll(".questionContainer");
const allAnswered = document.querySelectorAll(".answerBox");
const allRightOrWrongText = document.querySelectorAll(".rightOrWrongText");

function checkAnswer(){


    for (let i = 0; i < allAnswered.length; i++){
        if (allAnswered[i].value.toLowerCase() === answerList[i].toLowerCase()){
            allRightOrWrongText[i].innerText = "Right"
            allRightOrWrongText[i].style.color = "#00d100"
            questionsAnsweredCorrect += 1;
            updateScoreUI();

        }else{
            allRightOrWrongText[i].innerText = "Wrong"
            allRightOrWrongText[i].style.color = "red"
        }
    }
    previousAnsweredCorrect = questionsAnsweredCorrect;
}


//Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("shownQuestion");
        }
    })
});

allQuestionCon.forEach((element) => observer.observe(element));