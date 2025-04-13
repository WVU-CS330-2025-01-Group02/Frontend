/*
TODO:
Incorporate REACT into this to make the website more dynamic what with UI design and creating
a more dynamic experience.
jQUERY stuff too maybe.
Fixed bugs
Make another finished message that's not a browser message. 
Instead of a finished message, add a results page that accesses the database

NOTES for Questions: Pricing, Basic Weather, Adverse Weather, and Walkability
*/

const questions = [
    {
        // Basic Weather
        question: "What type of weather do you prefer?",
        options: [
            { img: "images/cat", desc: "Bright, sunny weather year-round" },
            { img: "images/mountains", desc: "A cool breeze and an overcast sky" },
            { img: "images/onefortheroad", desc: "Mild weather with some sunshine" },
            { img: "images/stormy", desc: "A mix of all seasons" },
        ]
    },
    {
        question: "Pick a vacation destination!",
        options: [
            { img: "images/shoa_dead", desc: "A sunny beach town" },
            { img: "images/smiley", desc: "An urban city" },
            { img: "images/ThrowDown", desc: "A cozy forest cabin" },
            { img: "images/tokyodrifter", desc: "A remote mountain village" },
        ]
    },
    {
        question: "Pick an activity!",
        options: [
            { img: "images/wlf", desc: "Swimming in the ocean" },
            { img: "images/boxing", desc: "Skiing down snowy slopes" },
            { img: "images/kidsreturnbike", desc: "Skateboarding through the city" },
            { img: "images/election", desc: "Climbing or hiking outdoors" },
        ]
    },
    {
        // Adverse weather
        question: "Which of these weather conditions would be the worst to you?",
        options: [
            { img: "images/wlf", desc: "Heat waves" },
            { img: "images/boxing", desc: "Heavy snowstorms" },
            { img: "images/kidsreturnbike", desc: "Torrential rains" },
            { img: "images/election", desc: "Strong winds" },
        ]
    },
    {
        question: "How do you feel about possible adverse weather?",
        options: [
            { img: "images/kagemusha", desc: "I like to stay indoors" },
            { img: "images/rouge", desc: "I prepare with the appropriate gear and clothing" },
            { img: "images/implosison", desc: "It's an opportunity to experience something new" },
            { img: "images/lighthouse", desc: "I'll make plans around it" },
        ]
    },
    {
        question: "Which seasons do you prefer most?",
        options: [
            { img: "images/kagemusha", desc: "Long summer days with lots of sunshine" },
            { img: "images/rouge", desc: "The mild weather that comes with spring" },
            { img: "images/implosison", desc: "The cool air and changing leaves of autumn" },
            { img: "images/lighthouse", desc: "Winter" },
        ]
    },
    {
        // Pricing
        question: "What's your budget for your next trip?",
        options: [
            { img: "images/kagemusha", desc: "I like to save" },
            { img: "images/rouge", desc: "I'll spend money as long as I get value from the purchase" },
            { img: "images/implosison", desc: "I like to splurge on conveniences and comfort" },
            { img: "images/lighthouse", desc: "Money is not a factor" },
        ]
    },
    {
        question: "How important is the affordability of a destination to you?",
        options: [
            { img: "images/kagemusha", desc: "Very important" },
            { img: "images/rouge", desc: "A good balance between price and comfort" },
            { img: "images/implosison", desc: "I'll pay more for location and style" },
            { img: "images/lighthouse", desc: "Quality first, price later" },
        ]
    },
    {
        question: "How much do you usually spend while travelling or living?",
        options: [
            { img: "images/kagemusha", desc: "Essentials only" },
            { img: "images/rouge", desc: "I have a budget for the things I want to do" },
            { img: "images/implosison", desc: "I'll go out to dine and for fun" },
            { img: "images/lighthouse", desc: "I like to indulge in shopping and luxury" },
        ]
    },
    {
        // Walkability
        question: "What kind of environment is most appealing?",
        options: [
            { img: "images/kagemusha", desc: "A dense, walkable city" },
            { img: "images/rouge", desc: "Suburbia or a small town" },
            { img: "images/implosison", desc: "A rural place" },
            { img: "images/lighthouse", desc: "A neighborhood with a mix of walking and driving" },
        ]
    },
    {
        question: "How important is the ability to walk to destinations to you?",
        options: [
            { img: "images/kagemusha", desc: "Very important" },
            { img: "images/rouge", desc: "I'd like to walk but not to everything" },
            { img: "images/implosison", desc: "I don't mind driving to most locations" },
            { img: "images/lighthouse", desc: "I enjoy driving and open space" },
        ]
    },
    {
        question: "What's you most preferable daily commute?",
        options: [
            { img: "images/kagemusha", desc: "Public transport" },
            { img: "images/rouge", desc: "Walking" },
            { img: "images/implosison", desc: "Driving" },
            { img: "images/lighthouse", desc: "Biking or other similar means" },
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
