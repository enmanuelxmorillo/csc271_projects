

 // Getting the sliders from the HTML
let severity = document.getElementById("severity");
let frequency = document.getElementById("howFrequent");

// Updating the severity number when the slider moves
severity.addEventListener("input", function() {
  document.getElementById("severityValue").textContent = severity.value;
});

// Updating the frequency number when the slider moves
frequency.addEventListener("input", function() {
  document.getElementById("howFrequentValue").textContent = frequency.value;
});

// Getting the calculate button
let calculateButton = document.getElementById("calculatePriority");
calculateButton.addEventListener("click", function() {
// Converting the slider values into numbers
  let severityNumber = Number(severity.value);
  let frequencyNumber = Number(frequency.value);



  // Calculating the priority score
  let score = severityNumber * frequencyNumber;
  let priority = "";

  if (score >= 11) {
    priority = "High";
  } else if (score >= 6) {
    priority = "Medium";
  } else {
    priority = "Low";
  }

  // Displaying the result on the HTML page
  document.getElementById("result").textContent =
    "Priority Score: " + score + " - Priority Level: " + priority;

});
