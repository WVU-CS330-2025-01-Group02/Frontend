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
    }
];

let currentQuestion = 0;
let progress = 0;

function selectAnswer(selectedIndex) {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        progress += 10; // Increase progress bar
        
        updateQuiz();
    } else {
        alert("Quiz Complete!");
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
