const formForTest = document.getElementById("formForTest");
const addQuestionButton = document.getElementById("addQuestionButton");
const selectDocType = document.getElementById("selectDocType");
const questionCreationTypeContainer = document.getElementById("questionCreationTypeContainer");

let chosenTestType = null;

//Functions for test creating
function createTest(){
    chosenTestType = selectDocType.value;
    selectDocType.style.display = "none";

    const nameInput = document.createElement("input");
    const nameInputLabel = document.createElement("label");

    const nameDiv = document.createElement('div');

    nameDiv.classList = "nameDiv"

    nameInputLabel.innerHTML = "Name: "

    nameInput.placeholder = "Name of test.."
    nameInput.classList = "nameInput"


    nameDiv.appendChild(nameInputLabel);
    nameDiv.appendChild(nameInput);
    formForTest.insertBefore(nameDiv, questionCreationTypeContainer)



    //Create plain question button types
    const buttonForSAQ = document.createElement("button");
    buttonForSAQ.innerText = "Create SAQ";
    buttonForSAQ.style.border = "1px white solid"
    buttonForSAQ.style.marginLeft = "10px"

    const buttonForPDF = document.createElement("button");
    buttonForPDF.innerText = "Generate Test";
    buttonForPDF.style.border = "1px white solid"
    buttonForPDF.style.marginLeft = "10px"
    
    addQuestionButton.innerText = "Create MCQ"


    buttonForSAQ.onclick = createSAQ;
    addQuestionButton.onclick = createMCQ;

    questionCreationTypeContainer.appendChild(buttonForSAQ);
    questionCreationTypeContainer.appendChild(buttonForPDF);
}

function createMCQ(){
    const mcqPanel = document.createElement("div");
    mcqPanel.classList = "mcqPanel";

    const deleteQuestionButton = document.createElement("a");
    deleteQuestionButton.addEventListener("click", function(){
        mcqPanel.remove();
    })
    deleteQuestionButton.innerText = "Delete";
    deleteQuestionButton.classList = "deleteQuestionButton"

    const mcqQuestionInput = document.createElement("input");
    mcqQuestionInput.placeholder = "Add question..";
    mcqQuestionInput.classList = "mcqQuestionInput";

    const mcqAnswerGenButton = document.createElement("button");
    mcqAnswerGenButton.innerText = "Add answer";
    mcqAnswerGenButton.classList = "mcqAnswerGenButton";
    mcqAnswerGenButton.onclick = function(){ createMCQAnswer(mcqPanel, mcqAnswerGenButton); };

    mcqPanel.appendChild(deleteQuestionButton);
    mcqPanel.appendChild(mcqQuestionInput);
    mcqPanel.appendChild(mcqAnswerGenButton);
    

    formForTest.insertBefore(mcqPanel, questionCreationTypeContainer);

}

function createSAQ(){

}



function createMCQAnswer(mcqPanel, mcqAnswerGenButton){
    const mcqAnswer = document.createElement("div");
    mcqAnswer.classList = "mcqAnswerContainer"

    const mcqAnswerCheck = document.createElement("input");
    mcqAnswerCheck.type = "checkbox";
    mcqAnswerCheck.classList = "mcqAnswerCheck";

    const mcqAnswerInput = document.createElement("input");
    mcqAnswerInput.placeholder = "Add answer here.."
    mcqAnswerInput.classList = "mcqAnswerInput";


    mcqAnswer.appendChild(mcqAnswerCheck);
    mcqAnswer.appendChild(mcqAnswerInput);

    mcqPanel.insertBefore(mcqAnswer, mcqAnswerGenButton)
}





addQuestionButton.onclick = createTest;

