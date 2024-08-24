const questionBank = `{
    "categories": {
        "Physics": {
            "questions": {
                "What is the force of gravity in newtons?": "9.8"
            },
            "about": {
                "about": "This is about physics. Physics is a branch of science where you explore the natural causes of certain things like gravity, forces, interactions between objects, etc. These help provide key insights on how the world around us works. For this topic, the bulk of questions will be focused on <a href = https://www.encyclopedia.com/science/science-magazines/physics-newtonian-physics#:~:text=Newtonian%20physics%2C%20also%20called%20Newtonian,Newton%20(1642%E2%80%931727).>Newtonian Physics</a> <br><br>Some questions fetched from <a href=https://www.crackap.com/ap/physics-1/index.html>an AP site</a><br><br>Subtopics: <ul></div>[Kinematics](Kinematics)</ul>"
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
                "about": "This is about <a href=https://en.wikipedia.org/wiki/Chemistry>chemistry</a>, a field of science that studies matter and its interactions with each other and the space around.               <br><br>Subtopics: <ul>[Organic Chemistry](Organic Chemistry)</ul>"
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
        },
        "Kinematics": {
            "questions": {
                "An object free falls a distance of 10 meters from rest in a given amount of time. How far will the same object fall from rest in twice the elapsed time?": [["40m", "35m", "30m", "20m"], "40m"],
                "A boy drops a stone from a cliff and counts 3.0 s until he sees the stone hit the base. How high is the cliff in meters?": "45m",
                "Two vectors, A and B, have the same magnitude of 5, but vector A points north whereas vector B points east. What is the sum, A+B?": [["7.07", "5.60", "3.26", "7.91"], "7.07"],
                "If F1 = 20k, F2 = -5i + 10k, and F3 = 10i +15j, what is the sum of F1 + F2 + F3?": [["5i + 15j + 30k", "5k + 5i + 20j", "5i + 10k + 30j", "5j + 15i + 30k"], "5i + 15j + 30k"],
                "A baseball is thrown straight upward. What is the ball's velocity at its highest point?": [["0m/s", "3m/s", "Cannot determine", "2m/s"], "0m/s"],
                "How long would it take a car, starting from rest and accelerating uniformly in a straight line at 5 m/s^2, to cover a distance of 200m?": [["8.94s", "8.23s", "7.32s", "17.88s"], "8.94s"],
                "A rock is dropped off a cliff and strikes the ground with an impact velocity of 30 m/s. How high was the cliff?": "45 m",
                "A stone is thrown horizontally with an initial speed of 30 m/s from a bridge. Find the stone’s total speed when it enters the water 4 s later. (Ignore air and water resistance)": "50 m/s",
                "A car traveling at a speed of v0 m/s applies its brakes, skidding to a stop over a distance of x m with a constant deceleration. What would the skidding distance of the same car be if it were traveling at twice the initial speed?": [["3x meters", "4x meters", "2x meters", "x meters"], "4x meters"],
                "A soccer ball, at rest on the ground, is kicked with an initial velocity of 10m/s at a launch angle of 30º. Calculate its total flight time, assuming that air resistance is negligible.": "1 s",
                "A football is kicked at an 45º angle with an initial velocity of 15 m/s. What is the horizontal range of the football once it lands?": [["22.5m", "30.0m", "12.5m", "24.2m"], "22.5m"],
                "A person who weighs 800 N steps onto a scale on the floor of an elevator. If the elevator accelerates upward at a rate of 5 m/s^2, what will the scale read?": [["1200N", "1100N", "1350N", "1440N"], "1200N"],
                "A frictionless inclined plane of 30º has a 2 kg mass placed on it. What is the net force on the mass?": [["10N", "15N", "20N", "5N"], "10N"],
                "The coefficient of static friction between a box and ramp is 0.5. The ramp’s incline angle is 30º. If the box is placed at rest on the ramp, it will ___.": [["Accelerate down", "Accelerate, slow, stop", "Move w/ constant v", "Not move"], "Accelerate down"],
                "If all the forces acting on an object balance so that the net force is zero, then...": [["Object is at rest", "Object’s speed will dec", "Direction changes", "None of the above"], "None of the above"],
                "A bird with a mass of 1 kg gets hit by a 1000 kg truck with a force of 5000 N. What force does the bird exert back onto the truck?": [["5000N", "3000N", "4500N", "4750N"], "5000N"]




            },
            "about": {
                "about": "A subsection of [Physics](Physics) called Kinematics. Be sure to add units and for short answer questions, add a space between the value and the unit (ex. 2.0 s) <br>PS. G = 10 m/s^2"
            }
        },
        "Organic Chemistry": {
            "questions": {
                "How many bonding sites does Carbon have?": "4",
                "How many carbon atoms does Methane have?": "1",
                "How many hydrogen atoms does Methanol have?": "4",
                "Which of these is an example of an alcohol?": [["Benzene", "Acetone", "Ethanol", "Cyclobut-2-ene"], "Ethanol"]
            },
            "about": {
                "about": "A subsection of [Chemistry](Chemistry) called <a href=https://www.acs.org/careers/chemical-sciences/areas/organic-chemistry.html#:~:text=Organic%20chemistry%20is%20the%20study,phosphorus%2C%20silicon%2C%20sulfur).>Organic chemistry</a> which focuses on Polymers, naming under the <a href=https://iupac.org/>IUPAC</a> <a href=https://www2.chemistry.msu.edu/faculty/reusch/virttxtjml/nomen1.htm>naming system</a>. The common elements you might find here are Carbon, Hydorgen, Oxygen."
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
let linkList = [];

let chosenQuestion = null;
let chosenAnswer = null;

let amountOfQuestions = null;
let numOfQuestionsAnsweredCorrect = 0;

let numOfQuestions = 0;

const mostRecentQueue = [];



//Save category chosen from previous page
let savedCategory = window.name;
if (document.URL.includes("test") === false){
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

function searchpage(){
    window.location.replace("search.html")
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
    aboutSection.innerHTML = chosenCategoryAbout.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a onclick = "redirectTest(\'$2\')" style = "font-style: italic">$1</a>');
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
    shuffle(allPossibleAnswers, allPossibleQuestions)
    

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
    
function nonEventListenerTest(element){
    window.name = element;
    window.location.replace("test.html");
}