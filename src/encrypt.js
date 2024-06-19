// src/js/encrypt.js

export function initTextEncryptor() {
    const encryptForm = document.getElementById('encrypt-form');
    const encryptInput = document.getElementById('encrypt-input');
    const encryptKey = document.getElementById('encrypt-key');
    const generateKeyButton = document.getElementById('generate-key');
    const encryptButton = document.getElementById('encrypt-button');
    const encryptResult = document.getElementById('encrypt-result');
    const encryptOutput = document.getElementById('encrypt-output');
  
    generateKeyButton.addEventListener('click', () => {
      encryptKey.value = generateRandomString(16);
    });
  
    encryptButton.addEventListener('click', () => {
      const text = encryptInput.value;
      const key = encryptKey.value;
  
      if (!text || !key) {
        alert('Please provide both text and an encryption key.');
        return;
      }
  
      const encryptedText = encryptText(text, key);
      encryptOutput.textContent = encryptedText;
      encryptResult.classList.remove('hidden');
    });
  }
  
  function encryptText(text, key) {
    // Simple encryption function (for demonstration purposes)
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      encryptedText += String.fromCharCode(charCode);
    }
    return btoa(encryptedText); // Base64 encode the result
  }
  
  function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  