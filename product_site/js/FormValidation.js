/*
  Name: Enmanuel Morillo
  Date: November 24, 2026
  File: js/FormValidation.js
  Description: Gives users real-time feedback while they fill out the
  "Submit a Bug Report" form on report.html.
    - focus  -> when a field gains focus, a hint explains what to type.
    - blur   -> when a field loses focus, the input is checked and an
                error message appears if it is not valid.
    - submit -> when the form is submitted, the page does NOT reload
                (preventDefault). Every field is checked one more time and,
                if everything is valid, a message says the responses were
                successfully recorded.

  AI-assisted: Claude (Anthropic) helped me plan and write this file
  (the field rules, the focus/blur/submit listeners, and the comments).
  Full details of my AI usage: [PASTE LINK TO YOUR AI DOCUMENTATION HERE]
*/

// ---------- Settings ----------
// The ids of the form fields this script checks. Each field has a matching
// feedback <p> in report.html whose id is the field id + "-message"
// (example: "bug_title" -> "bug_title-message").
const FORM_FIELD_IDS = [
  "where_found",
  "bug_title",
  "bug_description",
  "steps_to_reproduce",
];

// Minimum and maximum number of characters for each field
const WHERE_FOUND_MIN = 3;
const TITLE_MIN = 5;
const TITLE_MAX = 80;
const DESCRIPTION_MIN = 20;
const STEPS_MIN = 10;

// ---------- Functions ----------

/*
  getHintMessage(fieldId)
  Purpose: Returns the tip that is shown when a field gains focus.
  Parameters:
    fieldId - the id of the input or textarea
  Returns: the hint as text
*/
function getHintMessage(fieldId) {
  if (fieldId === "where_found") {
    return "Tip: Name the website, app, or software (at least " + WHERE_FOUND_MIN + " characters).";
  } else if (fieldId === "bug_title") {
    return "Tip: Write a short summary of the problem (" + TITLE_MIN + " to " + TITLE_MAX + " characters).";
  } else if (fieldId === "bug_description") {
    return "Tip: Explain what you expected and what actually happened (at least " + DESCRIPTION_MIN + " characters).";
  } else if (fieldId === "steps_to_reproduce") {
    return "Tip: List what you did before the problem happened. Put each step on its own line (at least " + STEPS_MIN + " characters).";
  } else {
    return "";
  }
}

/*
  getErrorMessage(fieldId, value)
  Purpose: Checks if the user's input is valid for a field.
  Parameters:
    fieldId - the id of the input or textarea
    value   - the text the user typed
  Returns: an error message as text, or an empty string "" if the
  input is valid. (Empty string = no problems found.)
*/
function getErrorMessage(fieldId, value) {
  // Ignore spaces at the start and end so "   " counts as blank
  let text = value.trim();

  if (text === "") {
    return "This field cannot be blank.";
  }

  if (fieldId === "where_found" && text.length < WHERE_FOUND_MIN) {
    return "Please enter at least " + WHERE_FOUND_MIN + " characters for where you found the bug.";
  }

  if (fieldId === "bug_title") {
    if (text.length < TITLE_MIN) {
      return "Your title is too short. Use at least " + TITLE_MIN + " characters.";
    } else if (text.length > TITLE_MAX) {
      return "Your title is too long. Keep it under " + TITLE_MAX + " characters.";
    }
  }

  if (fieldId === "bug_description" && text.length < DESCRIPTION_MIN) {
    return "Please add more detail. The description needs at least " + DESCRIPTION_MIN +
      " characters (you have " + text.length + ").";
  }

  if (fieldId === "steps_to_reproduce" && text.length < STEPS_MIN) {
    return "Please describe the steps in at least " + STEPS_MIN + " characters.";
  }

  return "";
}

/*
  showFieldMessage(fieldId, message, type)
  Purpose: Shows a message under a field and styles it.
  Parameters:
    fieldId - the id of the input or textarea
    message - the text to show ("" clears the message)
    type    - "hint", "error", or "valid" (used as a CSS class)
  Returns: nothing
*/
function showFieldMessage(fieldId, message, type) {
  let field = document.getElementById(fieldId);
  let messageArea = document.getElementById(fieldId + "-message");

  if (!field || !messageArea) {
    return;
  }

  messageArea.textContent = message;
  messageArea.className = "field-message " + type;

  // Red border on the field only when there is an error
  if (type === "error") {
    field.classList.add("input-error");
  } else {
    field.classList.remove("input-error");
  }
}

/*
  onFieldFocus(event)
  Purpose: Event listener for the "focus" event. Shows the hint
  for the field that the user just clicked or tabbed into.
  Parameters:
    event - the event object (event.target is the field that got focus)
  Returns: nothing
*/
function onFieldFocus(event) {
  let fieldId = event.target.id;
  showFieldMessage(fieldId, getHintMessage(fieldId), "hint");
}

/*
  checkField(fieldId)
  Purpose: Checks one field and shows an error or a "looks good" message.
  Parameters:
    fieldId - the id of the input or textarea
  Returns: true if the field is valid, false if it is not
*/
function checkField(fieldId) {
  let field = document.getElementById(fieldId);
  let error = getErrorMessage(fieldId, field.value);

  if (error !== "") {
    showFieldMessage(fieldId, error, "error");
    return false;
  }

  showFieldMessage(fieldId, "Looks good!", "valid");
  return true;
}

/*
  onFieldBlur(event)
  Purpose: Event listener for the "blur" event. Checks the field the
  user just left.
  Parameters:
    event - the event object (event.target is the field that lost focus)
  Returns: nothing
*/
function onFieldBlur(event) {
  checkField(event.target.id);
}

/*
  onFormSubmit(event)
  Purpose: Event listener for the form's "submit" event. Stops the page
  from reloading, checks every field, and shows the result.
  Parameters:
    event - the event object for the submit
  Returns: nothing
*/
function onFormSubmit(event) {
  // Stop the default behavior (sending the form and reloading the page)
  event.preventDefault();

  let statusArea = document.getElementById("form-status");
  let invalidCount = 0;
  let firstInvalidId = "";

  // Loop through every field and check it
  for (let i = 0; i < FORM_FIELD_IDS.length; i++) {
    let isValid = checkField(FORM_FIELD_IDS[i]);

    if (!isValid) {
      invalidCount++;

      if (firstInvalidId === "") {
        firstInvalidId = FORM_FIELD_IDS[i];
      }
    }
  }

  if (invalidCount > 0) {
    statusArea.textContent = "Please fix the " + invalidCount +
      (invalidCount === 1 ? " field" : " fields") + " marked in red before submitting.";
    statusArea.className = "form-status error";
  } else {
    let title = document.getElementById("bug_title").value.trim();
    statusArea.textContent = "Thank you! Your responses for \"" + title +
      "\" were successfully recorded.";
    statusArea.className = "form-status success";
  }

  // Scroll the status message into view so the user sees it
  statusArea.scrollIntoView({ behavior: "smooth", block: "center" });
}

/*
  setUpFormValidation()
  Purpose: Selects the form and its fields, then assigns the focus,
  blur, and submit event listeners.
  Parameters: none
  Returns: nothing
  Behavior: If the form isn't on the current page, it stops quietly so
  this file won't cause errors on other pages.
*/
function setUpFormValidation() {
  // 1. Select the element nodes
  let form = document.getElementById("bug-form");

  if (!form) {
    return;
  }

  // 2 + 3. Assign the functions as event listeners to every field
  for (let i = 0; i < FORM_FIELD_IDS.length; i++) {
    let field = document.getElementById(FORM_FIELD_IDS[i]);

    if (field) {
      field.addEventListener("focus", onFieldFocus);
      field.addEventListener("blur", onFieldBlur);
    }
  }

  form.addEventListener("submit", onFormSubmit);
}

// ---------- Start ----------
setUpFormValidation();
