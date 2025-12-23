document.querySelector(".nav-back").addEventListener("click", () => {
  window.history.back();
});

// Crypto addresses
const cryptoAddresses = {
  btc: 'bc1qesm88f07ttlpg6ejh73ppvaml8fmn7fgwap82g',
  eth: '0xC7AF991B7c686EC8Be4Cef8823FbEd0f875609bb',
  usdt: 'TU75wq8kiZQXi1sjEJrm8F3BkiVdTbb45a',
  ltc: 'ltc1qv3qe50vhpg700n3cd3kj69gfp35lfnuezffrgl',
  ton: 'UQDiGyMveUm0ROXN45hI5vsZRq5z1YUZNlr6YwegAok2zrLi',
  bnb: '0xC7AF991B7c686EC8Be4Cef8823FbEd0f875609bb',
  sol: 'D4D9q1w6Z9QBd3zmEGQERWs4MJTSwt1wLan6rBUR1KDU',
  doge: 'DC1Sq8FfMencmj9FS5i3yY8dSjkkgxSbzV',
  ada: 'addr1qypevjclceata79gs72h8c9jfwzsytr7yavtrn9j85e6eak6ly4suhqmjsq9q7awl5vujssp0up248u64dq4swcgzjhsn73w2j'
};

// Donate page functionality
function showAddress(crypto) {
  const address = cryptoAddresses[crypto];
  if (address) {
    const addressElement = document.getElementById(`${crypto}-address`);
    addressElement.textContent = address;
    addressElement.classList.add('visible');

    const copyBtn = document.querySelector(`[data-crypto="${crypto}"] .copy-btn`);
    copyBtn.disabled = false;
    copyBtn.textContent = 'Copy';
  } else {
    const addressElement = document.getElementById(`${crypto}-address`);
    addressElement.textContent = 'Address not found';
  }
}

function copyAddress(crypto) {
  const address = cryptoAddresses[crypto];

  if (address) {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        showCopyFeedback(crypto);
      }).catch(() => {
        fallbackCopy(address, crypto);
      });
    } else {
      fallbackCopy(address, crypto);
    }
  }
}

function fallbackCopy(address, crypto) {
  // Fallback for older browsers and mobile devices
  const textArea = document.createElement('textarea');
  textArea.value = address;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);

  try {
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyFeedback(crypto);
    }
  } catch (error) {
    console.error('Fallback copy failed:', error);
  } finally {
    document.body.removeChild(textArea);
  }
}

function showCopyFeedback(crypto) {
  const copyBtn = document.querySelector(`[data-crypto="${crypto}"] .copy-btn`);
  const originalText = copyBtn.textContent;
  copyBtn.textContent = 'Done';
  copyBtn.style.backgroundColor = '#1a5f1a';
  copyBtn.style.borderColor = '#2a7f2a';

  setTimeout(() => {
    copyBtn.textContent = originalText;
    copyBtn.style.backgroundColor = '';
    copyBtn.style.borderColor = '';
  }, 1500);
}

