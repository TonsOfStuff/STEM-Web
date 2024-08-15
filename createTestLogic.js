const formForTest = document.getElementById("formForTest");
const addQuestionButton = document.getElementById("addQuestionButton");
const selectDocType = document.getElementById("selectDocType");
const questionCreationTypeContainer = document.getElementById("questionCreationTypeContainer");
const bluePrintTest = document.getElementById("bluePrintTest");

//Doc variables
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

const pageHeight = doc.internal.pageSize.height;
const pageWidth = doc.internal.pageSize.width;
const maxLineWidth = pageWidth - 30;
let yOffset = 15;

let chosenTestType = null;



//Functions for test creating
function createTest(){
    chosenTestType = selectDocType.value;
    selectDocType.style.display = "none";
    bluePrintTest.style.display = "none";

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

    return [mcqPanel, mcqAnswerGenButton];
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

    return saqPanel;
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

    doc = new jsPDF();

    doc.setFontSize(25);
    doc.setFont

    const testName = document.getElementById("nameInput").value
    addTextToPDF(testName, 10, yOffset);
    
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
                addTextToPDF(questionCount.toString() + ".  " + "No question added", 15, yOffset)
            }else{
                addTextToPDF(questionCount.toString() + ".  " + inputVal.value, 15, yOffset)
            }
    
            element.querySelectorAll(".mcqAnswerContainer").forEach(mcq => {
                mcqLetters += 1;
                yOffset += 8;
                const optionLetter = String.fromCharCode(96 + mcqLetters);
                addTextToPDF(optionLetter + ") " + mcq.childNodes[1].value, 20, yOffset)
            })
        }else if (element.classList[0] === "saqPanel"){
            const saqInput = element.childNodes[1];
            if (saqInput.value === ""){
                addTextToPDF(questionCount.toString() + ".  " + "No question added", 15, yOffset)
            }else{
                addTextToPDF(questionCount.toString() + ".  " + saqInput.value, 15, yOffset)
            }
            yOffset += 10;
        }
        
    });

    doc.save(testName + ".pdf");
}

function addTextToPDF(text, x) {
    const lines = doc.splitTextToSize(text, maxLineWidth);
    let lineHeight = 8;
    lines.forEach((line, index)=> {
        if (yOffset + 10 > pageHeight) {
            doc.addPage();
            yOffset = 15;
        }
        doc.text(line, x, yOffset);

        if (index < lines.length - 1) {
            yOffset += lineHeight;
        }
    });
}


function selectExistingTest(){
    selectDocType.style.display = "none";
    bluePrintTest.innerText = "Cancel";
    bluePrintTest.onclick = function (){
        addQuestionButton.onclick = createTest;
        addQuestionButton.innerText = "Create test";

        selectDocType.style.display = "block";

        bluePrintTest.innerText = "Load existing test";
        bluePrintTest.onclick = selectExistingTest;

        dropDownForTopics.remove();
        labelForDropDown.remove();

    }

    addQuestionButton.innerText = "Import test";
    addQuestionButton.onclick = function () {genTestBasedOffExisting(dropDownForTopics, labelForDropDown);};


    //Create dropdown of all possible tests
    const dropDownForTopics = document.createElement("select");
    dropDownForTopics.classList.add("dropDownForTopics")

    const labelForDropDown = document.createElement("label");
    labelForDropDown.innerText = "Select topic:"

    formForTest.insertBefore(labelForDropDown, questionCreationTypeContainer)
    formForTest.insertBefore(dropDownForTopics, questionCreationTypeContainer)


    Object.keys(categories).forEach(topic => {
        const topicOpt = document.createElement("option");
        topicOpt.innerText = topic;
        topicOpt.value = topic;

        dropDownForTopics.appendChild(topicOpt);
    });
}

function genTestBasedOffExisting(dropdownTopics, labelForTopics){
    const topic = dropdownTopics.value;
    dropdownTopics.remove();
    labelForTopics.remove();

    const questions = Object.keys(categories[topic]["questions"])
    const answers = Object.values(categories[topic]["questions"])

    createTest();
    const nameInput = document.getElementById("nameInput");
    nameInput.value = topic;

    for (let i = 0; i < questions.length; i++){
        if (typeof(answers[i]) === "object"){
            const mcqPanel = createMCQ();
            mcqPanel[0].childNodes[1].value = questions[i];
            for (let j = 0; j < 4; j++){
                createMCQAnswer(mcqPanel[0], mcqPanel[1]);
            }
            const mcqChoices = mcqPanel[0].querySelectorAll(".mcqAnswerContainer")
            for (let j = 0; j < 4; j++){
                mcqChoices[j].childNodes[1].value = answers[i][0][j];
                if (answers[i][1] === answers[i][0][j]){
                    mcqChoices[j].childNodes[0].checked = true;
                }
            }
        }else{
            const saqPanel = createSAQ();
            saqPanel.childNodes[1].value = questions[i];
        }
    }

    
}



addQuestionButton.onclick = createTest;

