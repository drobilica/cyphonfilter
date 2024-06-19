// src/js/ssh-key.js
import * as openpgp from 'openpgp';

export function initSSHKeyGenerator() {
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
