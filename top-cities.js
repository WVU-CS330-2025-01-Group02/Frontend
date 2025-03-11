const selectElement = document.getElementById("attribute");
const resultsDiv = document.getElementById("results");

const overall = [1, 2, 3, 4, 5]; // will be replaced with API call
const walkability = [6, 54, 3, 21, 7];
const temps = [8, 9, 90, 78, 56];
const precipitation = [43, 12, 0, 98, 67];

// update results when a new selection is made
function updateResults(selectedValue) {
    let sortedArray = [];

    // sorted high to low except for "coldest" sorted low to high
    if (selectedValue == "overall") {
        sortedArray = overall.sort((a, b) => b - a);
    } else if (selectedValue == "walkable") {
        sortedArray = walkability.sort((a, b) => b - a);
    } else if (selectedValue == "warmest") {
        sortedArray = temps.sort((a, b) => b - a);
    } else if (selectedValue == "coldest") {
        sortedArray = temps.sort((a, b) => a - b);
    } else if (selectedValue == "rainiest") {
        sortedArray = precipitation.sort((a, b) => b - a);
    }

    // display in console for debugging
    console.log(sortedArray);

    // display results to user
    resultsDiv.innerHTML = `<p>Results:<br> ${sortedArray.join("<br>")}</p>`;
}

// if no attribute is selected, auto select overall
updateResults("overall");

// when attribute is changed, call updateResults()
selectElement.addEventListener("change", function() {
    updateResults(selectElement.value);

});