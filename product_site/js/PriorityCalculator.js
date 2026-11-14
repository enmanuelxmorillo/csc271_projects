/*  Name: Enmanuel Morillo
  Date: November 14, 2026
  File: js/PriorityCalculator.js
  Description: Powers the Bug Priority Calculator on report.html. It shows the
  current value of the Severity and Frequency sliders, calculates a priority
  score, turns that score into a Low / Medium / High priority level, and
  displays the result on the page. The code is split into small functions so
  each piece can be reused, tested, and updated on its own.

  */

// ---------- Settings ----------
// Score cutoffs for each priority level (highest possible score is 3 x 5 = 15).
// Keeping them here means I only have to change one spot to adjust the levels.
const HIGH_PRIORITY_MIN = 11;
const MEDIUM_PRIORITY_MIN = 6;

// ---------- Functions ----------

/*
  updateSliderDisplay(slider, displayId)
  Purpose: Shows a slider's current value in a text element on the page.
  Parameters:
    slider    - the range <input> element to read the value from
    displayId - the id of the element where the value should be shown
  Returns: nothing
  Behavior: If the display element can't be found, it does nothing
  instead of causing an error.
  (Replaces the two copy-pasted slider listeners from the old version.)
*/
function updateSliderDisplay(slider, displayId) {
  let display = document.getElementById(displayId);

  if (display) {
    display.textContent = slider.value;
  }
}

/*
  calculatePriorityScore(severity, frequency)
  Purpose: Multiplies severity by frequency to get a priority score.
*/
function calculatePriorityScore(severity, frequency) {
  // Slider values come in as text, so convert them to numbers first
  let severityNumber = Number(severity);
  let frequencyNumber = Number(frequency);

  let severityIsValid = severityNumber >= 1 && severityNumber <= 3;
  let frequencyIsValid = frequencyNumber >= 1 && frequencyNumber <= 5;

  if (!severityIsValid || !frequencyIsValid) {
    return null;
  }

  return severityNumber * frequencyNumber;
}

/*
  getPriorityLevel(score)
  Purpose: Turns a priority score into a priority level.
  Parameters:
    score - the number returned by calculatePriorityScore()
  Returns: "High", "Medium", or "Low" as text,
  or "Unknown" if the score is not a valid number.
*/
function getPriorityLevel(score) {
  if (typeof score !== "number" || isNaN(score)) {
    return "Unknown";
  }

  if (score >= HIGH_PRIORITY_MIN) {
    return "High";
  } else if (score >= MEDIUM_PRIORITY_MIN) {
    return "Medium";
  } else {
    return "Low";
  }
}

/*
  formatPriorityMessage(score, level)
  Purpose: Builds the sentence that gets shown to the user.
  Parameters:
    score - the priority score (a number, or null if it couldn't be calculated)
    level - the priority level text from getPriorityLevel()
  Returns: the message as text. If the score is null, it returns a
  friendly message asking the user to check the sliders instead.
*/
function formatPriorityMessage(score, level) {
  if (score === null) {
    return "Please choose a severity and frequency to calculate a priority.";
  }

  return "Priority Score: " + score + " - Priority Level: " + level;
}

/*
  showPriorityResult()
  Purpose: Reads both sliders, calculates the priority, and shows the
  result in the #result element. Runs when "Calculate Priority" is clicked.
  Parameters: none
  Returns: nothing
*/
function showPriorityResult() {
  let severitySlider = document.getElementById("severity");
  let frequencySlider = document.getElementById("howFrequent");
  let resultArea = document.getElementById("result");

  let score = calculatePriorityScore(severitySlider.value, frequencySlider.value);
  let level = getPriorityLevel(score);

  resultArea.textContent = formatPriorityMessage(score, level);
}

/*
  setUpPriorityCalculator()
  Purpose: Connects the sliders and button to the functions above and
  shows each slider's starting value when the page loads.
  Parameters: none
  Returns: nothing
  Behavior: If the calculator isn't on the current page, it stops quietly
  so this file won't cause errors on other pages.
*/
function setUpPriorityCalculator() {
  let severitySlider = document.getElementById("severity");
  let frequencySlider = document.getElementById("howFrequent");
  let calculateButton = document.getElementById("calculatePriority");

  if (!severitySlider || !frequencySlider || !calculateButton) {
    return;
  }

  // Update each number whenever its slider moves (same function, different arguments)
  severitySlider.addEventListener("input", function () {
    updateSliderDisplay(severitySlider, "severityValue");
  });

  frequencySlider.addEventListener("input", function () {
    updateSliderDisplay(frequencySlider, "howFrequentValue");
  });

  calculateButton.addEventListener("click", showPriorityResult);

  // Match the numbers to the sliders on load (the browser can remember
  // slider positions after a refresh)
  updateSliderDisplay(severitySlider, "severityValue");
  updateSliderDisplay(frequencySlider, "howFrequentValue");
}

/*
  runPriorityTests()
  Purpose: Calls calculatePriorityScore() and getPriorityLevel() with a
  variety of inputs and prints PASS or FAIL for each one in the browser
  console (Inspect -> Console).
  Parameters: none
  Returns: nothing
*/
function runPriorityTests() {
  // Each test: [severity, frequency, expected score, expected level]
  let tests = [
    [1, 1, 1, "Low"], // lowest possible score
    [1, 5, 5, "Low"], // highest Low score
    [2, 3, 6, "Medium"], // lowest Medium score
    [2, 5, 10, "Medium"], // highest Medium score
    [3, 4, 12, "High"], // High score
    [3, 5, 15, "High"], // highest possible score
    ["2", "4", 8, "Medium"], // text values, like real slider values
    [0, 3, null, "Unknown"], // severity too low
    [2, 6, null, "Unknown"], // frequency too high
    ["abc", 2, null, "Unknown"], // not a number
  ];

  let passedCount = 0;

  console.log("--- Bug Priority Calculator tests ---");

  for (let i = 0; i < tests.length; i++) {
    let test = tests[i];
    let score = calculatePriorityScore(test[0], test[1]);
    let level = getPriorityLevel(score);
    let passed = score === test[2] && level === test[3];

    if (passed) {
      passedCount++;
    }

    console.log(
      (passed ? "PASS" : "FAIL") +
        " | severity: " + test[0] +
        ", frequency: " + test[1] +
        " -> score: " + score +
        ", level: " + level
    );
  }

  console.log(passedCount + " of " + tests.length + " tests passed.");
}

// ---------- Start ----------
setUpPriorityCalculator();
runPriorityTests();