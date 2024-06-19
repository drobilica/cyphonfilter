import * as openpgp from 'openpgp';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  initTabs();
  initSSHKeyGenerator();
  initPasswordGenerator();
  initBase64EncoderDecoder();
});

// Initialize tab functionality
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

// Initialize SSH Key Generator functionality
function initSSHKeyGenerator() {
  const sshKeyForm = document.getElementById('ssh-key-form');
  const sshKeyResult = document.getElementById('ssh-key-result');
  const sshKeyOutput = document.getElementById('ssh-key-output');
  const sshPublicKeyOutput = document.getElementById('ssh-public-key-output');
  const downloadPrivateKeyButton = document.getElementById('download-private-key');
  const downloadPublicKeyButton = document.getElementById('download-public-key');

  sshKeyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const keyType = document.getElementById('key-type').value;
    const keySize = parseInt(document.getElementById('key-size').value);
    const keyName = document.getElementById('key-name').value || 'my-ssh-key';
    const passphrase = document.getElementById('key-passphrase').value;

    try {
      const { privateKey, publicKey } = await generateSSHKey(keyType, keySize, keyName, passphrase);

      sshKeyOutput.textContent = privateKey;
      sshPublicKeyOutput.textContent = publicKey;
      sshKeyResult.classList.remove('hidden');

      setupDownloadButton(downloadPrivateKeyButton, privateKey, `${keyName}.pem`);
      setupDownloadButton(downloadPublicKeyButton, publicKey, `${keyName}.pub.pem`);
    } catch (error) {
      console.error('Error generating SSH key:', error);
    }
  });
}

async function generateSSHKey(keyType, keySize, keyName, passphrase) {
  if (keyType === 'rsa') {
    return await openpgp.generateKey({
      type: 'rsa',
      rsaBits: keySize,
      userIDs: [{ name: keyName }],
      passphrase: passphrase,
    });
  } else if (keyType === 'ed25519') {
    return await openpgp.generateKey({
      type: 'ecc',
      curve: 'ed25519',
      userIDs: [{ name: keyName }],
      passphrase: passphrase,
    });
  }
}

// Initialize Password Generator functionality
function initPasswordGenerator() {
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

// Helper function to create a password
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

// Initialize Base64 Encoder/Decoder functionality
function initBase64EncoderDecoder() {
  const base64Form = document.getElementById('base64-form');
  const base64Input = document.getElementById('base64-input');
  const base64Output = document.getElementById('base64-output');
  const encodeButton = document.getElementById('encode-button');
  const decodeButton = document.getElementById('decode-button');

  encodeButton.addEventListener('click', () => {
    const input = base64Input.value;
    base64Output.value = btoa(input);
  });

  decodeButton.addEventListener('click', () => {
    const input = base64Input.value;
    try {
      base64Output.value = atob(input);
    } catch (e) {
      base64Output.value = 'Invalid Base64 input';
    }
  });
}

// Helper function to set up download button
function setupDownloadButton(button, content, filename) {
  button.onclick = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
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
