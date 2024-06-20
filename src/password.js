// src/js/password.js

export function initPasswordGenerator() {
    const passwordLengthInput = document.getElementById('password-length');
    const passwordLengthValue = document.getElementById('password-length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const passwordResult = document.getElementById('password-result');
    const passwordOutput = document.getElementById('password-output');
    const copyPasswordButton = document.getElementById('copy-password');

    const inputs = [passwordLengthInput, includeUppercase, includeLowercase, includeNumbers, includeSymbols];
  
    inputs.forEach(input => {
      input.addEventListener('input', generatePassword);
    });
  
    copyPasswordButton.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordOutput.textContent);
    });
  
    generatePassword(); // Generate initial password with default settings
  
    function generatePassword() {
      const length = parseInt(passwordLengthInput.value);
      const useUppercase = includeUppercase.checked;
      const useLowercase = includeLowercase.checked;
      const useNumbers = includeNumbers.checked;
      const useSymbols = includeSymbols.checked;
  
      passwordLengthValue.textContent = length; // Update the length value display
  
      const generatedPassword = createPassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
      passwordOutput.textContent = generatedPassword;
      passwordResult.classList.remove('hidden');
    }
  }
  
  function createPassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    let allChars = '';
    if (useUppercase) allChars += uppercaseChars;
    if (useLowercase) allChars += lowercaseChars;
    if (useNumbers) allChars += numberChars;
    if (useSymbols) allChars += symbolChars;
  
    if (allChars.length === 0) return '';
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }
    return password;
  }
  