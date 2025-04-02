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
            { img: "images/rouge", desc: "Storm" },
        ]
    },
    {
        question: "Pick a vacation destination!",
        options: [
            { img: "images/shoa_dead", desc: "Beach" },
            { img: "images/smiley", desc: "City" },
            { img: "images/ThrowDown", desc: "Forest" },
            { img: "images/tokyodrifter", desc: "Desert" },
        ]
    },
    {
        question: "What food do you like?",
        options: [
            { img: "", desc: "Seafood" },
            { img: "", desc: "Tacos" },
            { img: "", desc: "Pizza" },
            { img: "", desc: "Bread" },
        ]
    },
    {
        question: "Pick an activity!",
        options: [
            { img: "", desc: "Swimming" },
            { img: "", desc: "Skiing" },
            { img: "", desc: "Cycling" },
            { img: "", desc: "Climbing" },
        ]
    },
    {
        question: "Random Question",
        options: [
            { img: "", desc: "1" },
            { img: "", desc: "2" },
            { img: "", desc: "3" },
            { img: "", desc: "4" },
        ]
    }
];

let currentQuestion = 0;
let progress = 0;

function retakeQuiz() {
    currentQuestion = 0;
    progress = 0;

    // Reset the progress bar height
    document.getElementById("progress-bar").style.height = `${progress}%`;

    document.getElementById("retakeButton").style.display = "none";

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

// Initialize quiz on page load
updateQuiz();
