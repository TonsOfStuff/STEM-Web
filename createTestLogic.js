const formForTest = document.getElementById("formForTest");
const addQuestionButton = document.getElementById("addQuestionButton");
const selectDocType = document.getElementById("selectDocType");
const questionCreationTypeContainer = document.getElementById("questionCreationTypeContainer");
const bluePrintTest = document.getElementById("bluePrintTest");
const cipherContainer = document.getElementById("cipherContainer");

const a = ["a", "b", 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

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

    doc.setFont("Times", "normal");
    doc.setFontSize(25);

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

selectDocType.addEventListener("change", function(){
    if (selectDocType.value === "plain"){
        addQuestionButton.onclick = createTest;
    }else{
        addQuestionButton.onclick = createTestCrypto;
    }
})



//Cryptography test
function createTestCrypto(){
    cipherContainer.style.display = "inline";


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

    addQuestionButton.onclick = createCryptographyQuestion;

    const buttonForPDF = document.createElement("button");
    buttonForPDF.innerText = "Generate Test";
    buttonForPDF.style.border = "1px white solid"
    buttonForPDF.style.marginLeft = "10px"

    buttonForPDF.id = "buttonForPDF";
    addQuestionButton.innerText = "Add Cipher"

    buttonForPDF.onclick = encrypt;


    nameDiv.appendChild(nameInputLabel);
    nameDiv.appendChild(nameInput);
    formForTest.insertBefore(nameDiv, questionCreationTypeContainer);
    questionCreationTypeContainer.appendChild(buttonForPDF)
}


function createCryptographyQuestion(){
    //Select for different types of ciphers
    //Warning: Lots of terrible code
    const crPanel = document.createElement("div");
    crPanel.classList.add("crPanel")

    const deleteQuestionButton = document.createElement("a");
    deleteQuestionButton.addEventListener("click", function(){
        crPanel.remove();
    })
    deleteQuestionButton.innerText = "Delete";
    deleteQuestionButton.classList.add("deleteQuestionButton")

    const crQuestionInput = document.createElement("input");
    crQuestionInput.placeholder = "Add text to cipher..";
    crQuestionInput.classList.add("saqQuestionInput");

    const typeOfCr = document.createElement("div");
    typeOfCr.classList.add("typeOfCr");
    typeOfCr.innerText = cipherContainer.value;
    typeOfCr.style.margin="15px";
    typeOfCr.style.position="absolute";
    typeOfCr.style.justifySelf="left";
    typeOfCr.style.fontSize="12px";

    crPanel.appendChild(typeOfCr);
    crPanel.appendChild(deleteQuestionButton);
    crPanel.appendChild(crQuestionInput);

    formForTest.insertBefore(crPanel, questionCreationTypeContainer);




    if (cipherContainer.value === "Caesar"){
        const shiftInput = document.createElement("input");
        shiftInput.type = "number";
        shiftInput.placeholder = "Caesar shift amount.."
        shiftInput.value = "3";
        shiftInput.classList.add("shiftInput");

        crPanel.appendChild(shiftInput)
    }

}

function encrypt(){
    const allCr = document.querySelectorAll(".typeOfCr");
    const listOfEncrypted = [];
    allCr.forEach(question => {

        const plaintext = question.parentElement.childNodes[2].value.toLowerCase();
        let ciphertext = "";
        if (question.innerText === "Atbash"){           //ATBASH
            for (let i = 0; i < plaintext.length; i++){
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                ciphertext += a[Math.abs(25 - a.indexOf(plaintext[i]))];
            }
        }else if (question.innerText === "Caesar"){         //CAESAR
            for (let i = 0; i < plaintext.length; i++){
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                let cipherNum = a.indexOf(plaintext[i]) + Math.round(question.parentElement.childNodes[3].value);
                if (cipherNum > 25){
                    cipherNum %= 26;
                }
                ciphertext += a[cipherNum];
            }
        }else if (question.innerText === "Xenocrypt"){             //XENOCRYPTS
            const dupe = derangement(a)
            for (let i = 0; i < plaintext.length; i++){
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                ciphertext += dupe[a.indexOf(plaintext[i])];
            }
        }else if (question.innerText.includes("Aristocrat")){         //Aristocrat
            for (let i = 0; i < plaintext.length; i++){
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                ciphertext += a[(9 * a.indexOf(plaintext[i]) + 42) % 26];
            }
        }
        listOfEncrypted.push(ciphertext);
    });

    createPDFCypher(listOfEncrypted)
}


function createPDFCypher(answers){
    doc = new jsPDF();

    doc.setFontSize(25);
    doc.setFont("Times", "normal");

    xC = 0;
    yOffset = 15;

    const testName = document.getElementById("nameInput").value
    addTextToPDF(testName, 10, yOffset);
    
    const allCr = document.querySelectorAll(".crPanel");
    
    doc.setFontSize(15)
    yOffset += 20;
    let panelCounter = -1;
    let questionCount = 0;
    allCr.forEach(panel => {
        panelCounter += 1;
        questionCount += 1;

        addTextToPDF(questionCount.toString() + ".  Solve this " + panel.childNodes[0].innerText + " cipher", 10);
        yOffset += 5;
        codeBustersColumn(answers[panelCounter], 10, yOffset)
    });


    doc.save(`${testName}.pdf`)
}


//Stolen code from ChatGPT lmaooo except bottom part which looks significantly worse ;(
function codeBustersColumn(text, x, y, rectWidth = 8, rectHeight = 8) {

    let hashTable = new Map();

    const pageWidth = doc.internal.pageSize.width; // Get the page width
    const pageHeight = doc.internal.pageSize.height; // Get the page height
    const rightMargin = 10; // Right margin to prevent text from going off the page
    const bottomMargin = 10; // Bottom margin to avoid text being too close to the edge

    
    
    doc.setFontSize(15);
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        
        hashTable.set(letter, (hashTable.get(letter) ?? 0) + 1);

        // If the box would go off the right side of the page, wrap to the next line
        if (x + rectWidth + rightMargin > pageWidth) {
            x = rightMargin; // Reset x position to the left margin
            y += rectHeight * 2 + 5; // Move y position down for the next row of boxes
            yOffset = y;
        }

        let widthBox = 0
        for (let j = 1; j <= text.length-i; j++){ //No idea what this does but some text wrapping here
            console.log(j)
            let check = text[i + j];
            
            if (check !== " "){
                widthBox += rectWidth;
            }else{
                if (widthBox + x + rightMargin > pageWidth && x != rightMargin){
                    x = rightMargin;
                    y += rectHeight * 2 + 5;
                    yOffset = y;
                    break;
                }else{
                    break;
                }
            }
        }

        // If the box would go off the bottom of the page, create a new page
        if (y + rectHeight * 2 + bottomMargin > pageHeight) {
            doc.addPage();
            y = bottomMargin;
            yOffset = y; // Reset y position to the top of the new page
        }

        // Draw the first rectangle
        doc.rect(x, y, rectWidth, rectHeight);
        // Draw the second rectangle directly below the first
        doc.rect(x, y + rectHeight, rectWidth, rectHeight);

        // If the letter is not a space, draw the letter inside the first rectangle
        if (letter !== " ") {
            const textX = x + rectWidth / 2 - doc.getTextWidth(letter) / 2;
            const textY = y + rectHeight / 2 + 2; // Adjust vertical centering as needed
            doc.text(letter, textX, textY);
        }

        // Update the x position for the next box
        x += rectWidth; // Move x to the right for the next box
        
    }

    y += 40;
    yOffset = y;
    if (y + rectHeight * 2 + bottomMargin > pageHeight) {
        doc.addPage();
        y = bottomMargin;
        yOffset = y; // Reset y position to the top of the new page
    }
    x = rightMargin;

    doc.setFontSize(10);
    rectHeight -= 2;
    rectWidth -= 2;

    doc.setFont("Times", "bold");

    let xText = x + rectWidth / 2 + doc.getTextWidth("Frequency") / 2 - 8;
    let yText = y + 4; 
    doc.text("Frequency", xText, yText);

    xText = x + rectWidth / 2 + doc.getTextWidth("Replacement") / 2 - 12;
    yText = y + 4 + rectWidth; 
    doc.text("Replacement", xText, yText);

    doc.rect(x, y, rectWidth + 15, rectHeight)
    doc.rect(x, y + rectWidth, rectWidth + 15, rectHeight)
    
    x += rectWidth + 15;

    for (let i = 0; i < 26; i++){
        doc.rect(x, y - rectHeight, rectWidth, rectHeight);
        doc.rect(x, y, rectWidth, rectHeight);
        doc.rect(x, y + rectHeight, rectWidth, rectHeight);

        
        let letterA = a[i];
        let number = hashTable.get(a[i]) ?? 0;


        xText = x + rectWidth / 2 - doc.getTextWidth(letterA) / 2 - 0.5;
        yText = y + 3.5 - rectHeight; 
        doc.setFont("Times", "bold");
        doc.text(letterA.toString().toUpperCase(), xText, yText);

        xText = x + rectWidth / 2 - doc.getTextWidth(number.toString()) / 2;
        yText = y + 3.5; 
        doc.setFont("Times", "normal");
        doc.text(number.toString(), xText, yText);

        x += rectWidth
    }

    doc.setFontSize(15);
    yOffset += 40;
}







//Fisher-Yates Shuffle Algorithm
function derangement(array) {
    // Helper function to check if the permutation is a derangement
    function isDerangement(arr, original) {
        return arr.every((value, index) => value !== original[index]);
    }

    // Function to generate a derangement
    function generateDerangement(arr) {
        let deranged;
        do {
            deranged = shuffleReturn(arr);
        } while (!isDerangement(deranged, arr));
        return deranged;
    }

    // Shuffle function (Fisher-Yates)
    function shuffleReturn(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    return generateDerangement(array);
}
