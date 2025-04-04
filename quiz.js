/*
TODO:
Incorporate REACT into this to make the website more dynamic what with UI design and creating
a more dynamic experience.
jQUERY stuff too maybe.
Fixed bugs
Make another finished message that's not a browser message. 
Instead of a finished message, add a results page that accesses the database
*/

const questions = [
    {
        question: "What type of weather do you like?",
        options: [
            { img: "images/cat", desc: "Bright, sunny weather" },
            { img: "images/mountains", desc: "Overcast" },
            { img: "images/onefortheroad", desc: "Muggy" },
            { img: "images/stormy", desc: "Storm" },
        ]
    },
    {
        question: "Pick a vacation destination!",
        options: [
            { img: "images/shoa_dead", desc: "Beach" },
            { img: "images/smiley", desc: "City" },
            { img: "images/ThrowDown", desc: "Forest" },
            { img: "images/tokyodrifter", desc: "Mountains" },
        ]
    },
    {
        question: "What type of food do you like?",
        options: [
            { img: "images/plate", desc: "Seafood" },
            { img: "images/rice", desc: "Tacos" },
            { img: "images/fries", desc: "Pizza" },
            { img: "images/exposed", desc: "Soup" },
        ]
    },
    {
        question: "Pick an activity!",
        options: [
            { img: "images/wlf", desc: "Swimming" },
            { img: "images/boxing", desc: "Skiing" },
            { img: "images/kidsreturnbike", desc: "Cycling" },
            { img: "images/election", desc: "Climbing" },
        ]
    },
    {
        question: "If you had to do one thing for the rest of your life what would it be?",
        options: [
            { img: "images/kagemusha", desc: "Rot in bed" },
            { img: "images/rouge", desc: "Toke up" },
            { img: "images/implosison", desc: "Code" },
            { img: "images/lighthouse", desc: "Go fishing" },
        ]
    }
];

let currentQuestion = 0;
let progress = 0;
let userAnswers = [];

function retakeQuiz() {
    currentQuestion = 0;
    progress = 0;
    userAnswers = [];

    // Reset the progress bar height
    document.getElementById("progress-bar").style.height = `${progress}%`;

    document.getElementById("retakeButton").style.display = "none";

    // Hide results, show quiz
    document.getElementById("results-container").style.display = "none";
    document.querySelector(".personality__test").style.display = "block";

    // Reset button visibility
    document.getElementById("retakeButton").style.display = "none";
    document.getElementById("backButton").style.display = "none";

    // Re-enable answer buttons
    document.querySelectorAll(".option").forEach(button => {
        button.disabled = false;
    });

    updateQuiz();
}

function backButton() {
    document.querySelectorAll(".option").forEach(button => {
        button.disabled = false;
    });
    if (currentQuestion > 0) {
        currentQuestion--;
        progress = Math.max(progress - 20, 0); // Decrease progress
        updateQuiz();
    }
    if(currentQuestion == 0){
        progress = 0;
        document.getElementById("retakeButton").style.display = "none";
        updateQuiz();
    }
}

function selectAnswer(selectedIndex) {

    userAnswers.push(questions[currentQuestion].options[selectedIndex].desc); 

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        progress = Math.min(progress + 20, 100); // Increase progress
        updateQuiz();
    } else {
        // When on the last question, set progress to 100%
        progress = 100;
        document.getElementById("progress-bar").style.height = `${progress}%`; // Update height
        document.getElementById("retakeButton").style.display = "inline-block";
        document.getElementById("backButton").style.display = "inline-block";

        // Disable answer buttons when quiz is finished
        document.querySelectorAll(".option").forEach(button => {
            button.disabled = true;
        });

        document.querySelector(".personality__test").style.display = "none";
        document.getElementById("results-container").style.display = "block";

        // Generate results
        showResults();

    }
}

function updateQuiz() {
    const questionElement = document.querySelector(".question");
    const options = document.querySelectorAll(".option");

    // Update the question text
    questionElement.innerText = questions[currentQuestion].question;

    // Update images and descriptions for each option
    questions[currentQuestion].options.forEach((option, index) => {
        const imgElement = options[index].querySelector("img");
        const descElement = options[index].querySelector("p");
        const basePath = option.img;

        // Try PNG first, then JPG if PNG fails
        imgElement.src = basePath + ".png";
        imgElement.onerror = function () {
            imgElement.onerror = null; // Prevent infinite loop
            imgElement.src = basePath + ".jpg";
        };

        descElement.innerText = option.desc;
    });

    // Update the progress bar height based on current progress
    document.getElementById("progress-bar").style.height = `${progress}%`;

    // Show or hide the back button depending on the current question
    document.getElementById("backButton").style.display = currentQuestion > 0 ? "inline-block" : "none";
}

function showResults(){
    let sunny = 0;
    let overcast = 0;
    let muggy = 0;
    let stormy = 0;

    userAnswers.forEach(answer => {
        if (answer == "Bright, sunny weather") sunny++;
        else if (answer == "Overcast") overcast++;
        else if (answer == "Muggy") muggy++;
        else if (answer == "Storm") stormy++;
    });

    let finalResult = "";
    let resultImage = "";

    if (sunny > overcast && sunny > muggy && sunny > stormy) {
        finalResult = "You're best suited for a tropical destination!";
        resultImage = "images/tropical_image.jpg";
    } 
    else if (overcast > sunny && overcast > muggy && overcast > stormy) {
        finalResult = "You'd thrive in cooler, overcast climates!";
        resultImage = "images/tropical_image.jpg";
    } 
    else if (muggy > sunny && muggy > overcast && muggy > stormy) {
        finalResult = "You'd enjoy humid, muggy environments!";
        resultImage = "images/tropical_image.jpg";
    } 
    else {
        finalResult = "You'd love the thrill of stormy weather!";
        resultImage = "images/tropical_image.jpg";
    }

    document.getElementById("quizOutcome").innerText = finalResult;
    document.getElementById("quizOutcome").classList.add("show");

    document.querySelector("#results-container img").src = resultImage;
    document.querySelector("#results-container img").style.display = "block";
}
// Initialize quiz on page load
updateQuiz();
