/*
  Name: Enmanuel Morillo
  Date: November 24, 2026
  File: js/ReportPreview.js
  Description: When you click "Preview My Report", this shows your answers
  as an organized bug report, like the ones on the Examples page.
  If something is missing, it tells you to finish the form first.

  Note: this file uses functions from FormValidation.js and
  PriorityCalculator.js, so it has to load after them.

  AI-assisted: Claude AI helped me with comments 
*/

// ---------- Helper functions ----------

// Adds one row to the report table
function addReportRow(table, label, value) {
  let row = document.createElement("tr");
  let labelCell = document.createElement("td");
  let valueCell = document.createElement("td");

  labelCell.textContent = label;
  valueCell.textContent = value;

  row.appendChild(labelCell);
  row.appendChild(valueCell);
  table.appendChild(row);
}

// Turns each line of the steps box into a numbered list item
function buildStepsList(stepsText) {
  let list = document.createElement("ol");
  let lines = stepsText.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let step = lines[i].trim();

    if (step !== "") {
      let item = document.createElement("li");
      item.textContent = step;
      list.appendChild(item);
    }
  }

  return list;
}

// Gets the priority from the calculator sliders
function getPriorityText() {
  let severity = document.getElementById("severity").value;
  let frequency = document.getElementById("howFrequent").value;
  let score = calculatePriorityScore(severity, frequency);
  let level = getPriorityLevel(score);

  if (score === null) {
    return "Not calculated";
  }

  return level + " (score " + score + " of 15)";
}

// Checks if the user picked a screenshot
function getScreenshotText() {
  let upload = document.getElementById("screenshot");

  if (upload.files.length > 0) {
    return "Attached: " + upload.files[0].name;
  }

  return "No screenshot added (optional)";
}

// ---------- Main function (runs on click) ----------

function showReportPreview() {
  let previewArea = document.getElementById("report-preview");
  let previewMessage = document.getElementById("preview-message");
  let previewButton = document.getElementById("previewReport");

  let whereFound = document.getElementById("where_found").value.trim();
  let title = document.getElementById("bug_title").value.trim();
  let description = document.getElementById("bug_description").value.trim();
  let steps = document.getElementById("steps_to_reproduce").value.trim();

  // Make sure every answer is filled in correctly
  let allValid =
    getErrorMessage("where_found", whereFound) === "" &&
    getErrorMessage("bug_title", title) === "" &&
    getErrorMessage("bug_description", description) === "" &&
    getErrorMessage("steps_to_reproduce", steps) === "";

  // Not ready yet, so show a message and stop here
  if (!allValid) {
    previewArea.hidden = true;
    previewArea.textContent = "";
    previewMessage.textContent =
      "Your report isn't ready to preview yet. Please fill in every question above " +
      "(click into each box to see what's needed).";
    previewMessage.className = "form-status error";
    return;
  }

  // Everything looks good, so clear the old stuff and build the report
  previewMessage.textContent = "";
  previewMessage.className = "form-status";
  previewArea.textContent = "";

  let heading = document.createElement("h3");
  heading.textContent = "Your BugFlow Report Preview";

  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  let headerLabel = document.createElement("th");
  let headerValue = document.createElement("th");
  headerLabel.textContent = "Report Detail";
  headerValue.textContent = "Information";
  headerRow.appendChild(headerLabel);
  headerRow.appendChild(headerValue);
  table.appendChild(headerRow);

  addReportRow(table, "Application/Website", whereFound);
  addReportRow(table, "Bug Title", title);
  addReportRow(table, "Problem", description);
  addReportRow(table, "Priority", getPriorityText());
  addReportRow(table, "Screenshot", getScreenshotText());

  let stepsHeading = document.createElement("h3");
  stepsHeading.textContent = "Steps to Reproduce";

  let note = document.createElement("p");
  note.className = "hint";
  note.textContent = "Look good? Click \"Submit Bug Report\" below. Need changes? Edit your answers and preview again.";

  previewArea.appendChild(heading);
  previewArea.appendChild(table);
  previewArea.appendChild(stepsHeading);
  previewArea.appendChild(buildStepsList(steps));
  previewArea.appendChild(note);

  // Show the preview and scroll down to it
  previewArea.hidden = false;
  previewButton.textContent = "Update Preview";
  previewArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- Set up the button ----------

// Find the button and run showReportPreview() when it's clicked
function setUpReportPreview() {
  let previewButton = document.getElementById("previewReport");

  if (!previewButton) {
    return;
  }

  previewButton.addEventListener("click", showReportPreview);
}

setUpReportPreview();