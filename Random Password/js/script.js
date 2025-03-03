// Get references to the HTML elements
const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");

const lowerCaseEl = document.getElementById("lowercase");
const upperCaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("genBtn");
const copyBtn = document.getElementById("copyIcon");
const passIndicator = document.getElementById("passIndicator");

// Define the characters that can be used in the password
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}\\|;':\",./<>?";

// Initialize the slider value display
sliderValue.textContent = inputSlider.value;

// Add event listener to update the password length when the slider changes
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
    generatePassword(); // Generate a new password when the slider value changes
});

// Function to generate a password based on selected options
function generatePassword() {
    const length = inputSlider.value; // Get the length of the password from the slider
    let characters = ""; // Variable to store all selected characters for the password
    let password = ""; // Variable to store the generated password

    // Add selected character sets to the "characters" variable
    characters += lowerCaseEl.checked ? lowercaseLetters : "";
    characters += upperCaseEl.checked ? uppercaseLetters : "";
    characters += numbersEl.checked ? numbers : "";
    characters += symbolsEl.checked ? symbols : "";

    // Generate a random password by picking characters from the "characters" string
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passBox.value = password; // Set the generated password in the password input box
    updatePasswordIndicator(); // Update the password strength indicator
}

// Add event listener to the "Generate Password" button
generateBtn.addEventListener("click", () => {
    generatePassword(); // Generate password when the button is clicked
});

// Function to update the password strength indicator based on the password
function updatePasswordIndicator() {
    const passwordStrength = getPasswordStrength(passBox.value); // Get the password strength
    console.log(passwordStrength);
    passIndicator.className = "pass-indicator " + passwordStrength; // Update the class of the password strength indicator
    console.log(passIndicator.className);
}

// Function to determine the strength of the password
function getPasswordStrength(password) {
    if (password.length <= 10) {
        return "weak"; // Weak if password length is 10 or less
    } else if (password.length <= 20) {
        return "medium"; // Medium if password length is between 11 and 20
    } else {
        return "strong"; // Strong if password length is more than 20
    }
}

// Event listener to update the password strength indicator when the page loads
window.addEventListener('DOMContentLoaded', () => {
    updatePasswordIndicator(); // Call the function to set the initial password strength
});

// Add event listener to the "Copy to Clipboard" button
copyBtn.addEventListener("click", () => {
    if (passBox.value != "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value); // Copy the password to the clipboard
        copyBtn.innerText = "check"; // Change the button text to indicate successful copy

        // Change the button text back after 3 seconds
        setTimeout(() => {
            copyBtn.innerHTML = "content_copy";
        }, 3000);
    }
});
