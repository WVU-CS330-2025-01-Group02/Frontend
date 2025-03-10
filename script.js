/*
TODO:
Incorporate REACT into this to make the website more dynamic what with UI design and creating
a more dynamic experience.
jQUERY stuff too maybe.
ADD more questions. We want 5 to 10 max 
ADD Retake Quiz Button
ADD Back button
Make another finished message that's not a browser message. 
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
        question: "Pick a vacation destination",
        options: [
            { img: "images/shoa_dead", desc: "Beach" },
            { img: "images/smiley", desc: "City" },
            { img: "images/ThrowDown", desc: "Forest" },
            { img: "images/tokyodrifter", desc: "Desert" },
        ]
    },
    {
        question: "3",
        options: [
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
        ]
    },
    {
        question: "4",
        options: [
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
        ]
    },
    {
        question: "5",
        options: [
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
            {img: "", desc:""},
        ]
    }
];

let currentQuestion = 0;
let progress = 0;

function selectAnswer(selectedIndex) {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        progress += 20; // Increase progress bar
        
        updateQuiz();
    } else {
        progress += 20;
        updateQuiz();
    }
}

function updateQuiz() {
    const questionElement = document.querySelector(".question");
    const options = document.querySelectorAll(".option");

    // Update question text
    questionElement.innerText = questions[currentQuestion].question;

    // Update images and descriptions
    questions[currentQuestion].options.forEach((option, index) => {
        const imgElement = options[index].querySelector("img");
        const descElement = options[index].querySelector("p");
        const basePath = option.img;

        // First try PNG, then JPG if PNG fails
        imgElement.src = basePath + ".png";
        imgElement.onerror = function () {
            imgElement.onerror = null; // Prevent infinite loop
            imgElement.src = basePath + ".jpg";
        };

        descElement.innerText = option.desc;
    });

    // Update progress bar height
    document.getElementById("progress-bar").style.height = `${progress}%`;
}

// Initialize quiz on page load
updateQuiz();
