const formForTest = document.getElementById("formForTest");
const addQuestionButton = document.getElementById("addQuestionButton");
const selectDocType = document.getElementById("selectDocType");
const questionCreationTypeContainer = document.getElementById("questionCreationTypeContainer");
const bluePrintTest = document.getElementById("bluePrintTest");
const cipherContainer = document.getElementById("cipherContainer");

const a = ["a", "b", 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const morseLetters = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
];
const morseNum = {
    "0": '.----',
    "1": '..---',
    "2": '...--',
    "3": '....-',
    "4": '.....',
    "5": '-....',
    "6": '--...',
    "7": '---..',
    "8": '----.',
    "9": '-----'
}
const baconianCipher = {
    'a': 'aaaaa',
    'b': 'aaaab',
    'c': 'aaaba', 
    'd': 'aaabb', 
    'e': 'aabaa',
    'f': 'aabab', 
    'g': 'aabba', 
    'h': 'aabbb', 
    'i': 'abaaa', 
    'j': 'abaab',
    'k': 'ababa', 
    'l': 'ababb', 
    'm': 'abbaa', 
    'n': 'abbab', 
    'o': 'abbba',
    'p': 'abbbb', 
    'q': 'baaaa', 
    'r': 'baaab', 
    's': 'baaba', 
    't': 'baabb',
    'u': 'babaa', 
    'v': 'babab', 
    'w': 'babba', 
    'x': 'babbb', 
    'y': 'bbaaa', 
    'z': 'bbaab'
}

portaCodeY = {"a": 0, "b": 0, "c": 1, "d" : 1, "e": 2, "f": 2, "g": 3, "h": 3, "i": 4, "j": 4, "k": 5, "l": 5, "m": 6, "n": 6, "o": 7, "p": 7, "q": 8, "r": 8, "s": 9, "t": 9, "u": 10, "v": 10, "w": 11, "x": 11, "y": 12, "z": 12}
portaCodeX = {"a": 0, "b": 1, "c": 2, "d" : 3, "e": 4, "f": 5, "g": 6, "h": 7, "i": 8, "j": 9, "k": 10, "l": 11, "m": 12, "n": 13, "o": 14, "p": 15, "q": 16, "r": 17, "s": 18, "t": 19, "u": 20, "v": 21, "w": 22, "x": 23, "y": 24, "z": 25}
portaCipher = "nopqrstuvwxyzabcdefghijklm"

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

    const optionDivForCipher = document.createElement("div"); 
    optionDivForCipher.classList.add("optionDivForCipher")

    const turnOnBoxesOption = document.createElement("input");
    turnOnBoxesOption.type = "checkbox";
    turnOnBoxesOption.id = "turnOnBoxesOption";
    const turnOnBoxesLabel = document.createElement("label");
    turnOnBoxesLabel.innerText = "Turn on boxes: "; 

    optionDivForCipher.appendChild(turnOnBoxesLabel);
    optionDivForCipher.appendChild(turnOnBoxesOption);

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
    formForTest.insertBefore(optionDivForCipher, questionCreationTypeContainer);
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

    const crQuestionHintContainer = document.createElement("div");
    crQuestionHintContainer.style.display = "flex";
    crQuestionHintContainer.style.justifyContent = "space-between";

    const crQuestionPts = document.createElement("input");
    crQuestionPts.placeholder = "Point value";
    crQuestionPts.classList.add("crQuestionPts");
    crQuestionPts.type = "number";

    const crQuestionHint = document.createElement("input");
    crQuestionHint.placeholder = "Add hint, leave blank for no hint..";
    crQuestionHint.classList.add("crQuestionHint");

    crQuestionHintContainer.appendChild(crQuestionHint);
    crQuestionHintContainer.appendChild(crQuestionPts);

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
    crPanel.appendChild(crQuestionHintContainer);

    formForTest.insertBefore(crPanel, questionCreationTypeContainer);




    if (cipherContainer.value === "Caesar"){
        const shiftInput = document.createElement("input");
        shiftInput.type = "number";
        shiftInput.placeholder = "Caesar shift amount.."
        shiftInput.value = "3";
        shiftInput.classList.add("shiftInput");

        crPanel.appendChild(shiftInput)
    }else if (cipherContainer.value === "Porta"){
        const keyword = document.createElement("input");
        keyword.type = "text";
        keyword.placeholder = "Porta keyword.."
        keyword.classList.add("shiftInput");

        crPanel.appendChild(keyword)
    }else if (cipherContainer.value === "Pollux"){
        const dots = document.createElement("input");
        dots.placeholder = "Dots (.).. seperated by character"
        dots.classList.add("shiftInput");

        const dash = document.createElement("input");
        dash.placeholder = "Dashes (-).. seperated by character"
        dash.classList.add("shiftInput");

        const space = document.createElement("input");
        space.placeholder = "Spaces ( ).. seperated by character"
        space.classList.add("shiftInput");

        crQuestionHint.placeholder = "Hint stronly recommended"

        crPanel.appendChild(dots)
        crPanel.appendChild(dash)
        crPanel.appendChild(space)
    }else if (cipherContainer.value === "Cryptarithm"){
        crQuestionInput.placeholder = "Add equation like shirt + tshirt = clothes"
        const checkSolutions = document.createElement("button");
        checkSolutions.classList.add("checkSolutions");

        const numOfSolutions = document.createElement("div");
        const solDiv = document.createElement("div");
        checkSolutions.innerText = "Check for solutions";
        numOfSolutions.innerText = "0 Solutions";

        const map = document.createElement("div");

        checkSolutions.onclick = () => {
            numOfSolutions.innerText = "Looking for solutions..."
            let uniqueChars = new Set();
            const plaintext = crQuestionInput.value.toLowerCase();
            const words = plaintext.split(" = ").join(" ").split(" + ").join(" ").split(" ");
            const result = words.pop(0); // Get the result part
            // Collect all unique characters from words and result
            words.forEach(word => word.split('').forEach(char => uniqueChars.add(char)));
            result.split('').forEach(char => uniqueChars.add(char));
        
            uniqueChars = [...uniqueChars];
            if (uniqueChars.length > 10) {
                numOfSolutions.innerText = "Too many characters";
                return;
            }
        
            let charMap = {};
            let usedDigits = new Array(10).fill(false);
            let solutionCount = 0; // To count how many solutions there are
        
            // Recursive backtracking function to try different digit assignments
            function backtrack(index) {
                if (index === uniqueChars.length) {
                    if (checkCryptarithm(words, result, charMap)) {
                        solutionCount++;
                        if (solutionCount === 1) {
                            const k = Object.keys(charMap);
                            const v = Object.values(charMap);
                            map.innerText = k.join(",") + " maps to " + v.join(",");
                        }else{
                            const k = Object.keys(charMap);
                            const v = Object.values(charMap);
                            map.innerText = "One solution: " + k.join(",") + " maps to " + v.join(",");
                        }
                        return true;
                    }
                    return false;
                }
        
                // Try assigning digits 0-9 to characters
                let foundSolution = false;
                for (let digit = 0; digit < 10; digit++) {
                    // Check if digit is already used or if first letter of any word is assigned 0
                    if (!usedDigits[digit]) {
                        charMap[uniqueChars[index]] = digit;
                        usedDigits[digit] = true;
        
                        // Ensure first letter of any word or result can't be 0
                        if (digit === 0 && (isFirstLetter(uniqueChars[index], words, result))) {
                            usedDigits[digit] = false;
                            continue;
                        }
        
                        foundSolution = backtrack(index + 1) || foundSolution;
        
                        // Backtrack
                        usedDigits[digit] = false;
                        delete charMap[uniqueChars[index]];
                    }
                }
                return foundSolution;
            }
        
            if (backtrack(0)) {
                numOfSolutions.innerText = solutionCount === 1 ? `One solution found!` : `${solutionCount} solutions found!`;
            } else {
                numOfSolutions.innerText = "No solution found";
                map.innerText = "";
            }
        
            // Check if the current character-to-number mapping is valid for the cryptarithm
            function checkCryptarithm(words, result, charMap) {
                function wordToNumber(word) {
                    let num = 0;
                    for (const char of word) {
                        num = num * 10 + charMap[char];
                    }
                    return num;
                }
        
                const sum = words.reduce((acc, word) => acc + wordToNumber(word), 0);
                const resultValue = wordToNumber(result);
        
                return sum === resultValue;
            }
        
            // Function to check if a character is the first letter of any word or result
            function isFirstLetter(char, words, result) {
                for (const word of words) {
                    if (word[0] === char) return true;
                }
                return result[0] === char;
            }
        };
        

        solDiv.appendChild(numOfSolutions);
        solDiv.appendChild(checkSolutions);
        solDiv.style.display = "flex";
        solDiv.style.alignItems = "center";
        solDiv.style.justifyContent = "space-between";
        solDiv.style.padding = "10px";

        crPanel.appendChild(solDiv);
        crPanel.appendChild(map);
    }else if (cipherContainer.value === "Nihilist"){
        const keyword = document.createElement("input");
        keyword.placeholder = "Enter 1st keyword";
        const keywordTwo = document.createElement("input");
        keywordTwo.placeholder = "Enter 2nd keyword";

        crPanel.appendChild(keyword);
        crPanel.appendChild(keywordTwo);
    }

}

let globalHint = "";

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
                let cipherNum = a.indexOf(plaintext[i]) + Math.round(question.parentElement.childNodes[4].value);
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
        }else if (question.innerText.includes("Aristocrat")){         //ARISTOCRAT
            const dupe = derangement(a)
            for (let i = 0; i < plaintext.length; i++){
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                ciphertext += dupe[a.indexOf(plaintext[i])];
            }
        }else if (question.innerText === "Patristocrat"){         //PATRISTOCRAT
            const dupe = derangement(a)
            let newPlaintext = plaintext.split(" ").join("");
            for (let i = 0; i < newPlaintext.length; i++){
                if ((i) % 5 === 0){
                    ciphertext += " ";
                }
                if (a.includes(newPlaintext[i]) === false){
                    ciphertext += newPlaintext[i];
                    continue;
                }
                ciphertext += dupe[a.indexOf(newPlaintext[i])];
            }
        }else if (question.innerText === "Morse"){         //MORSE
            for (let i = 0; i < plaintext.length; i++){
                if (Object.keys(morseNum).includes(plaintext[i])){
                    ciphertext += morseNum[plaintext[i]];
                    ciphertext += "/";
                    continue;
                }
                if (a.includes(plaintext[i]) === false){
                    ciphertext += plaintext[i];
                    continue;
                }
                ciphertext += morseLetters[a.indexOf(plaintext[i])];
                try{
                    if (a.includes(plaintext[i + 1])){
                        ciphertext += "/";
                    }else{
                        ciphertext += "  ";
                    }
                }catch{
                    
                }
                
            }
        }else if (question.innerText === "Pollux"){         //POLLUX
            let morse = "";
            globalHint = "Last word is '" + plaintext.split(" ").at(-1) + "'";
            for (let i = 0; i < plaintext.length; i++){
                if (Object.keys(morseNum).includes(plaintext[i])){
                    morse += morseNum[plaintext[i]];
                    morse += "/";
                    continue;
                }
                if (a.includes(plaintext[i]) === false){
                    morse += plaintext[i];
                    continue;
                }
                morse += morseLetters[a.indexOf(plaintext[i])];
                try{
                    if (a.includes(plaintext[i + 1])){
                        morse += "/";
                    }else{
                        morse += "";
                    }
                }catch{
                    
                }
                
                
            }
            const dotOptions = question.parentElement.childNodes[4].value.split("");
            const dashOptions = question.parentElement.childNodes[5].value.split("");
            const spaceOptions = question.parentElement.childNodes[6].value.split("");
            console.log(morse.split(" ").join(" "));
            for (let i = 0; i < morse.length; i++){
                
                if (morse[i] === " "){
                    ciphertext += spaceOptions[Math.round(Math.random() * (spaceOptions.length - 1))] + spaceOptions[Math.round(Math.random() * (spaceOptions.length - 1))];
                }else if(morse[i] === "/"){
                    ciphertext += spaceOptions[Math.round(Math.random() * (spaceOptions.length - 1))];
                }else if (morse[i] === "."){
                    ciphertext += dotOptions[Math.round(Math.random() * (dotOptions.length - 1))]
                }else if (morse[i] === "-"){
                    ciphertext += dashOptions[Math.round(Math.random() * (dashOptions.length - 1))]
                }
                
            }
        }
        else if (question.innerText === "Baconian"){         //BACONIAN
            for (let i = 0; i < plaintext.length; i++){
                if (Object.keys(baconianCipher).includes(plaintext[i])){
                    ciphertext += baconianCipher[plaintext[i]];
                }else{
                    ciphertext += plaintext[i];
                }
            }
        }
        else if (question.innerText === "Porta"){                   //PORTA
            let porta = portaCipher.split("");
            let keyword = ""
            keyword = question.parentElement.childNodes[4].value;
            keyword = keyword.split(" ").join("");
            if (keyword === ""){
                keyword = "keyword";
            }
            keyword = keyword.repeat(Math.round(plaintext.length / keyword.length) + 2)
            let counter = 0;
            for (let i = 0; i < plaintext.length; i++){
                porta = portaCipher.split("");
                if (Object.keys(portaCodeX).includes(plaintext[i])){
                    for (k = 0; k < portaCodeY[keyword[i - counter]]; k++){
                        let be = porta.shift();
                        let end = porta.pop();
                        porta.splice(12, 0, be);
                        porta.splice(13, 0, end);
                        
                    }
                }else{
                    counter += 1;
                }
                
                if (Object.keys(portaCodeX).includes(plaintext[i])){
                    ciphertext += porta[portaCodeX[plaintext[i]]];
                }else{
                    ciphertext += plaintext[i];
                }
                
            }
        } 
        else if (question.innerText === "Cryptarithm"){              //CRYPTARITHMS
            ciphertext = plaintext;
        }
        else if (question.innerText === "Nihilist"){        //NIHILIST
            const alpha = [...a];
            const keyword = question.parentElement.childNodes[4].value;
            if (keyword === ""){
                keyword = "keyword";
            }
            const chars = new Set(keyword.split(""));
            chars.forEach(char => {
                if (indexOf(char) !== -1){
                    
                }
            });
            
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
    
    doc.setFontSize(12)
    yOffset += 20;
    let panelCounter = -1;
    let questionCount = 0;

    allCr.forEach(panel => {
        panelCounter += 1;
        questionCount += 1;
        let ptsVal = panel.childNodes[3].childNodes[1].value;
        if (ptsVal === ""){
            ptsVal = 0;
        }
        doc.setFontSize(12)
        doc.setFont("Times", "normal");
        if (panel.childNodes[3].childNodes[0].value !== "" || globalHint !== ""){
            addTextToPDF(questionCount.toString() + ".  [" + ptsVal + " points] Solve this " + panel.childNodes[0].innerText + " cipher. Hint: " + panel.childNodes[3].childNodes[0].value + " " + globalHint, 10);
            globalHint = "";
        }else{
            addTextToPDF(questionCount.toString() + ".  [" + ptsVal + " points] Solve this " + panel.childNodes[0].innerText + " cipher", 10);
        }
        yOffset += 15;
        codeBustersColumn(answers[panelCounter], 10, yOffset, panel.childNodes[0].innerText)
    });


    doc.save(`${testName}.pdf`)
}


//Stolen code from ChatGPT lmaooo 
function codeBustersColumn(text, x, y, type, rectWidth = 8, rectHeight = 8, ) {
    let hashTable = new Map();

    const pageWidth = doc.internal.pageSize.width; // Get the page width
    const pageHeight = doc.internal.pageSize.height; // Get the page height
    const rightMargin = 10; // Right margin to prevent text from going off the page
    const bottomMargin = 10; // Bottom margin to avoid text being too close to the edge
    const leftMargin = 10; // Left margin

    const turnOnBoxesOption = document.getElementById('turnOnBoxesOption');
    const isBoxOn = turnOnBoxesOption.checked;

    const docsThatDontNeed = ["Morse", "Morbit", "Pollux", "Cryptarithm"]

    
    doc.setFontSize(15);
    if (type === "Morse"){
        doc.setFontSize(12);
    }
    doc.setFont("Courier", "normal");

    let words = text.split(' '); // Split the text into words

    words.forEach(word => {
        let wordWidth = isBoxOn ? rectWidth * word.length : doc.getTextWidth(word) + doc.getTextWidth(" ");

        if (x + wordWidth + rightMargin > pageWidth) {
            if (wordWidth + rightMargin > pageWidth) {
                // Word is too long, fall back to letter-by-letter wrapping
                for (let letter of word) {
                    // Check if adding the letter will exceed page width
                    let letterWidth = isBoxOn ? rectWidth : doc.getTextWidth(letter);
                    hashTable.set(letter, (hashTable.get(letter) ?? 0) + 1)
                    if (x + letterWidth + rightMargin > pageWidth) {
                        x = leftMargin; // Reset x position to the left margin
                        y += rectHeight * 2 + 5; // Move y position down for the next row of boxes
                        yOffset = y;

                    }

                    // Draw the boxes if enabled
                    if (isBoxOn) {
                        doc.rect(x, y - 5.5, rectWidth, rectHeight);
                        doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                    }

                    // Draw the letter inside the box or at the correct position if not using boxes
                    let textX = x;
                    if (letter !== " ") {
                        if (isBoxOn) {
                            textX = x + rectWidth / 2 - doc.getTextWidth(letter) / 2;
                        }
                        let textY = y + rectHeight + 5; // Adjust vertical centering as needed
                        addTextToPDF(letter, textX, textY);
                    }

                    // Update the x position for the next letter
                    x += isBoxOn ? rectWidth : letterWidth;
                }

                // Add space after the word
                if (isBoxOn){
                    doc.rect(x, y - 5.5, rectWidth, rectHeight);
                    doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                    x += rectWidth;
                }else{
                    x += doc.getTextWidth(" ");
                }
                
            } else {
                x = leftMargin; // Reset x position to the left margin
                y += rectHeight * 2 + 5; // Move y position down for the next row of boxes
                yOffset = y;

                for (let letter of word) {
                    hashTable.set(letter, (hashTable.get(letter) ?? 0) + 1)
                    let textX = x;
                    if (isBoxOn) {
                        textX = x + rectWidth / 2 - doc.getTextWidth(letter) / 2;
                        doc.rect(x, y - 5.5, rectWidth, rectHeight);
                        doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                    }
                    let textY = y + rectHeight + 5; // Adjust vertical centering as needed
                    addTextToPDF(letter, textX, textY);
                    x += isBoxOn ? rectWidth : doc.getTextWidth(letter);
                }
    
    
                if (isBoxOn){
                    doc.rect(x, y - 5.5, rectWidth, rectHeight);
                    doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                    x += rectWidth;
                }else{
                    x += doc.getTextWidth(" ");
                }
            }
        }else{
            // Draw the word that fits on the line
            for (let letter of word) {
                hashTable.set(letter, (hashTable.get(letter) ?? 0) + 1)
                let textX = x;
                if (isBoxOn) {
                    textX = x + rectWidth / 2 - doc.getTextWidth(letter) / 2;
                    doc.rect(x, y - 5.5, rectWidth, rectHeight);
                    doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                }
                let textY = y + rectHeight + 5; // Adjust vertical centering as needed
                addTextToPDF(letter, textX, textY);
                x += isBoxOn ? rectWidth : doc.getTextWidth(letter);
            }


            if (isBoxOn){
                doc.rect(x, y - 5.5, rectWidth, rectHeight);
                doc.rect(x, y + rectHeight - 5.5, rectWidth, rectHeight);
                x += rectWidth;
            }else{
                x += doc.getTextWidth(" ");
            }
        }

    });

    // Adjust margins and add any additional content as needed
    y += 40;
    yOffset = y;
    if (y + rectHeight * 2 + bottomMargin > pageHeight) {
        doc.addPage();
        y = bottomMargin;
        yOffset = y;
    }
    x = leftMargin;

    if (docsThatDontNeed.includes(type) === false){
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

        doc.rect(x, y, rectWidth + 15, rectHeight);
        doc.rect(x, y + rectWidth, rectWidth + 15, rectHeight);
        
        x += rectWidth + 15;

        for (let i = 0; i < 26; i++) {
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

            x += rectWidth;
        }

        yOffset += 40;

        doc.setFontSize(15);
        
    }

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
