// src/js/main.js

import { initBase64EncoderDecoder } from './base64.js';
import { initTextEncryptor } from './encrypt.js';
import { initPasswordGenerator } from './password.js';
import { initSSHKeyGenerator } from './ssh-key.js';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSSHKeyGenerator();
    initPasswordGenerator();
    initBase64EncoderDecoder();
    initTextEncryptor();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const welcomeContent = document.getElementById('welcome');

    tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        tabContents.forEach(content => {
        content.classList.toggle('hidden', content.id !== target);
        });
        welcomeContent.classList.add('hidden');
        if (target === 'password-gen') {
        generatePassword(); // Call the global generatePassword function
        }
    });
    });
}

// Define generatePassword function globally to resolve the reference error
function generatePassword() {
    const passwordLengthInput = document.getElementById('password-length');
    const passwordLengthValue = document.getElementById('password-length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const passwordOutput = document.getElementById('password-output');
    const passwordResult = document.getElementById('password-result');

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
