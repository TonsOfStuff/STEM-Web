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
    nameInput.id = "nameInput"


    nameDiv.appendChild(nameInputLabel);
    nameDiv.appendChild(nameInput);
    formForTest.insertBefore(nameDiv, questionCreationTypeContainer)



    //Create plain question button types
    const buttonForSAQ = document.createElement("button");
    buttonForSAQ.innerText = "Create SAQ";
    buttonForSAQ.style.border = "1px white solid"
    buttonForSAQ.style.marginLeft = "10px"
    buttonForSAQ.id = "buttonForSAQ";

    const buttonForPDF = document.createElement("button");
    buttonForPDF.innerText = "Generate Test";
    buttonForPDF.style.border = "1px white solid"
    buttonForPDF.style.marginLeft = "10px"
    buttonForPDF.id = "buttonForPDF";

    buttonForPDF.onclick = generatePDF;
    
    addQuestionButton.innerText = "Create MCQ"


    buttonForSAQ.onclick = createSAQ;
    addQuestionButton.onclick = createMCQ;

    questionCreationTypeContainer.appendChild(buttonForSAQ);
    questionCreationTypeContainer.appendChild(buttonForPDF);
}

function createMCQ(){
    const mcqPanel = document.createElement("div");
    mcqPanel.classList.add("mcqPanel");
    mcqPanel.classList.add("panel");

    const deleteQuestionButton = document.createElement("a");
    deleteQuestionButton.addEventListener("click", function(){
        mcqPanel.remove();
    })
    deleteQuestionButton.innerText = "Delete";
    deleteQuestionButton.classList = "deleteQuestionButton"

    const mcqQuestionInput = document.createElement("input");
    mcqQuestionInput.placeholder = "Add MCQ question..";
    mcqQuestionInput.classList.add("mcqQuestionInput");

    const mcqAnswerGenButton = document.createElement("button");
    mcqAnswerGenButton.innerText = "Add MCQ answer";
    mcqAnswerGenButton.classList = "mcqAnswerGenButton";
    mcqAnswerGenButton.onclick = function(){ createMCQAnswer(mcqPanel, mcqAnswerGenButton); };

    mcqPanel.appendChild(deleteQuestionButton);
    mcqPanel.appendChild(mcqQuestionInput);
    mcqPanel.appendChild(mcqAnswerGenButton);
    

    formForTest.insertBefore(mcqPanel, questionCreationTypeContainer);

}

function createSAQ(){
    const saqPanel = document.createElement("div");
    saqPanel.classList.add("saqPanel")
    saqPanel.classList.add("panel");

    const deleteQuestionButton = document.createElement("a");
    deleteQuestionButton.addEventListener("click", function(){
        saqPanel.remove();
    })
    deleteQuestionButton.innerText = "Delete";
    deleteQuestionButton.classList.add("deleteQuestionButton")

    const saqQuestionInput = document.createElement("input");
    saqQuestionInput.placeholder = "Add SAQ question..";
    saqQuestionInput.classList.add("saqQuestionInput");

    saqPanel.appendChild(deleteQuestionButton);
    saqPanel.appendChild(saqQuestionInput);

    formForTest.insertBefore(saqPanel, questionCreationTypeContainer);
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

    const mcqDeleteAnswer = document.createElement("a");
    mcqDeleteAnswer.innerText = "Delete";
    mcqDeleteAnswer.style.fontSize = "12px"
    mcqDeleteAnswer.style.alignSelf = "center";

    mcqDeleteAnswer.addEventListener("click", function(){
        mcqAnswer.remove();
    })


    mcqAnswer.appendChild(mcqAnswerCheck);
    mcqAnswer.appendChild(mcqAnswerInput);
    mcqAnswer.appendChild(mcqDeleteAnswer);

    mcqPanel.insertBefore(mcqAnswer, mcqAnswerGenButton)
}


function generatePDF(){
    let mcqLetters = 0;
    let questionCount = 0;




    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yOffset = 15;

    doc.setFontSize(25);

    const testName = document.getElementById("nameInput").value
    doc.text(testName, 10, yOffset);
    
    const allQuestion = document.querySelectorAll(".panel");
    
    doc.setFontSize(15)
    yOffset += 10;
    allQuestion.forEach(element => {
        mcqLetters = 0;
        questionCount += 1;
        yOffset += 15;

        if (element.classList[0] === "mcqPanel") {
            const inputVal = element.childNodes[1]
            if (inputVal.value === ""){
                doc.text(questionCount.toString() + ". " + "No question added", 15, yOffset)
            }else{
                doc.text(questionCount.toString() + ". " + inputVal.value, 15, yOffset)
            }
    
            element.querySelectorAll(".mcqAnswerContainer").forEach(mcq => {
                mcqLetters += 1;
                yOffset += 8;
                const optionLetter = String.fromCharCode(96 + mcqLetters);
                doc.text(optionLetter + ") " + mcq.childNodes[1].value, 20, yOffset)
            })
        }else if (element.classList[0] === "saqPanel"){
            const saqInput = element.childNodes[1];
            if (saqInput.value === ""){
                doc.text(questionCount.toString() + ". " + "No question added", 15, yOffset)
            }else{
                doc.text(questionCount.toString() + ". " + saqInput.value, 15, yOffset)
            }
            yOffset += 10;
        }
        
    });

    doc.save(testName + ".pdf");
}


function generatePDFBasedOffExisting(){
    
}



addQuestionButton.onclick = createTest;

