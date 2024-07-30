let questionsAnsweredCorrect = 0;
let previousAnsweredCorrect = 0;

const filler = document.getElementById("filler");

let chosenMC = null;

function updateScoreUI(){
    scoreUI.innerText = (questionsAnsweredCorrect - previousAnsweredCorrect).toString() + "/" + amountOfQuestions.toString();
}

let counter = 0;

questionsList.forEach(element => {
    const questionCon = document.createElement("div");


    //Question text box
    const questionaire = document.createElement("div");
    const questionaireText = document.createTextNode(element);

    questionaire.className = "questionBox";
    questionaire.appendChild(questionaireText);
    questionCon.appendChild(questionaire);

    //Input container
    if (typeof(answerList[counter]) === "object"){
        //Make selectContainer in the outer scope
        const selectContainer = document.createElement("div");
        selectContainer.className = "selectorContainer"

        for (let i = 0; i < answerList[counter][0].length; i++){
            const optionClick = document.createElement("div");
            const optionClickTextNode = document.createTextNode(answerList[counter][0][i]);
            
            optionClick.className = "multipleChoiceOption";

            optionClick.addEventListener('click', function () {
                optionClick.classList.add("multipleChoiceSelected");
                try{
                    chosenMC.classList.remove("multipleChoiceSelected")
                }catch{
                    
                }
                chosenMC = optionClick;

            })


            optionClick.appendChild(optionClickTextNode);
            selectContainer.appendChild(optionClick)

            
        }
        questionCon.appendChild(selectContainer);

    } else {
        const questionInput = document.createElement("input");

        questionInput.className = "answerBox";
        questionInput.name = "answer";
        questionInput.type = "text";

        questionCon.appendChild(questionInput);
    }

    const rightOrWrongTextElement = document.createElement("div");

    const rightOrWrongTextNode = document.createTextNode("");
    

    questionCon.className = "questionContainer";

    

    

    rightOrWrongTextElement.className = "rightOrWrongText";
    rightOrWrongTextElement.appendChild(rightOrWrongTextNode);




    questionCon.appendChild(rightOrWrongTextElement)
    

    form.insertBefore(questionCon, filler);

    counter += 1;
});



const allQuestionCon = document.querySelectorAll(".questionContainer");
const allAnswered = document.querySelectorAll(".answerBox, .selectorContainer");
const allRightOrWrongText = document.querySelectorAll(".rightOrWrongText");

function checkAnswer(){
    for (let i = 0; i < allAnswered.length; i++){
        if (typeof(answerList[i]) === "object"){
            if (chosenMC !== null){ //Checking if nothing has been selected
                if (chosenMC.innerText === answerList[i][1]){
                    //Correct option for MC Question
                    allRightOrWrongText[i].innerText = "Right"
                    allRightOrWrongText[i].style.color = "#00d100"
                    questionsAnsweredCorrect += 1;
                    updateScoreUI();
                } else { //Wrong answer
                    allRightOrWrongText[i].innerText = "Wrong"
                    allRightOrWrongText[i].style.color = "red"
                }
            } else { //Nothings been selected
                allRightOrWrongText[i].innerText = "Wrong"
                allRightOrWrongText[i].style.color = "red"
            }
        } else {
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
        
    }
    previousAnsweredCorrect = questionsAnsweredCorrect;
}


//Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("shownQuestion");
        }
    })
});

allQuestionCon.forEach((element) => observer.observe(element));