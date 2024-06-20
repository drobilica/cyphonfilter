// src/js/encrypt.js

export function initTextEncryptor() {
    const encryptForm = document.getElementById('encrypt-form');
    const encryptInput = document.getElementById('encrypt-input');
    const encryptKey = document.getElementById('encrypt-key');
    const generateKeyButton = document.getElementById('generate-key');
    const encryptButton = document.getElementById('encrypt-button');
    const encryptResult = document.getElementById('encrypt-result');
    const encryptOutput = document.getElementById('encrypt-output');
    const encryptCharCount = document.getElementById('encrypt-char-count');
    const downloadEncryptedButton = document.getElementById('download-encrypted');
  
    const decryptForm = document.getElementById('decrypt-form');
    const decryptInput = document.getElementById('decrypt-input');
    const decryptKey = document.getElementById('decrypt-key');
    const decryptButton = document.getElementById('decrypt-button');
    const decryptResult = document.getElementById('decrypt-result');
    const decryptOutput = document.getElementById('decrypt-output');
    const downloadDecryptedButton = document.getElementById('download-decrypted');
  
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
  
    decryptButton.addEventListener('click', () => {
      const text = decryptInput.value;
      const key = decryptKey.value;
  
      if (!text || !key) {
        alert('Please provide both text and a decryption key.');
        return;
      }
  
      try {
        const decryptedText = decryptText(text, key);
        decryptOutput.textContent = decryptedText;
        decryptResult.classList.remove('hidden');
      } catch (e) {
        decryptOutput.textContent = 'Invalid encrypted text or decryption key.';
        decryptResult.classList.remove('hidden');
      }
    });
  
    encryptInput.addEventListener('input', () => {
      encryptCharCount.textContent = `${encryptInput.value.length}/2000`;
    });
  
    downloadEncryptedButton.addEventListener('click', () => {
      downloadText(encryptOutput.textContent, 'encrypted.txt');
    });
  
    downloadDecryptedButton.addEventListener('click', () => {
      downloadText(decryptOutput.textContent, 'decrypted.txt');
    });
  }
  
  function encryptText(text, key) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      encryptedText += String.fromCharCode(charCode);
    }
    return btoa(encryptedText);
  }
  
  function decryptText(text, key) {
    const decodedText = atob(text);
    let decryptedText = '';
    for (let i = 0; i < decodedText.length; i++) {
      const charCode = decodedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decryptedText += String.fromCharCode(charCode);
    }
    return decryptedText;
  }
  
  function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  function downloadText(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  