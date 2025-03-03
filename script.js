let userName = "";

function startQuiz() {
    userName = document.getElementById("username").value.trim();
    if (!userName) {
        alert("Please enter your name before starting the quiz.");
        return;
    }

    document.getElementById("name-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("welcome-message").innerText = `Welcome, ${userName}! Good luck!`;
}

function selectOption(option) {
    let options = option.parentElement.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    option.classList.add("selected");
    option.querySelector("input").checked = true;
}

function submitQuiz() {
    let selectedAnswer = document.querySelector("input[name='q1']:checked");

    if (!selectedAnswer) {
        alert("Please select an answer before submitting.");
        return;
    }

    // Create a form to submit the data
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'YOUR_NEW_GOOGLE_SCRIPT_URL_HERE'; // Replace with your new URL
    form.target = '_blank'; // This opens in a new tab
    
    // Add the username as a hidden field
    const nameField = document.createElement('input');
    nameField.type = 'hidden';
    nameField.name = 'name';
    nameField.value = userName;
    form.appendChild(nameField);
    
    // Add the answer as a hidden field
    const answerField = document.createElement('input');
    answerField.type = 'hidden';
    answerField.name = 'answer';
    answerField.value = selectedAnswer.value;
    form.appendChild(answerField);
    
    // Add the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    // Show confirmation to user
    alert(`Thank you, ${userName}! Your answer has been submitted.`);
}

function sendToGoogleSheets(data) {
    // Create a new form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://script.google.com/macros/s/AKfycbzkwG2yOuOw0Ec6eQRXKdAxY5lP9UqOuhq3fmSsQrt6sib9tgZU4Z8hYpZ4tEUbDTz5lw/exec';
    form.style.display = 'none'; // Hide the form
    
    // Add data as hidden form fields
    const nameField = document.createElement('input');
    nameField.type = 'hidden';
    nameField.name = 'name';
    nameField.value = data.name;
    form.appendChild(nameField);
    
    const answerField = document.createElement('input');
    answerField.type = 'hidden';
    answerField.name = 'answer';
    answerField.value = data.answer;
    form.appendChild(answerField);
    
    // Add the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
    
    // Show success message directly without waiting for response
    alert(`Thank you, ${data.name}! Your answer has been submitted.`);
}