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

    let result = {
        name: userName,
        answer: selectedAnswer.value
    };

    console.log("Quiz submitted:", result);
    alert(`Thank you, ${userName}! Your answer has been submitted.`);

    // Send data to Google Sheets
    sendToGoogleSheets(result);
}

function sendToGoogleSheets(data) {
    // Create a URL with parameters
    const url = `https://script.google.com/macros/s/AKfycbzkwG2yOuOw0Ec6eQRXKdAxY5lP9UqOuhq3fmSsQrt6sib9tgZU4Z8hYpZ4tEUbDTz5lw/exec?name=${encodeURIComponent(data.name)}&answer=${encodeURIComponent(data.answer)}`;
    
    // Create an invisible iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    
    // Add to document, wait a bit, then remove
    document.body.appendChild(iframe);
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 5000);
    
    console.log("Data sent to Google Sheets");
}