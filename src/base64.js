// src/js/base64.js

export function initBase64EncoderDecoder() {
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
  