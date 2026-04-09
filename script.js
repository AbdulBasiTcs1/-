const urlInput = document.getElementById("url-input");
const generateButton = document.getElementById("generate-btn");
const downloadButton = document.getElementById("download-btn");
const qrImage = document.getElementById("qr-image");
const statusBox = document.getElementById("status");

const browserApi = typeof browser !== "undefined" ? browser : chrome;
let currentUrl = "";

generateButton.addEventListener("click", generateQrForCurrentTab);
downloadButton.addEventListener("click", downloadQrCode);

initialize();

async function initialize() {
  setStatus("Reading current tab URL...");
  try {
    currentUrl = await getCurrentTabUrl();
    urlInput.value = currentUrl;
    setStatus("Ready to generate QR code.");
  } catch (error) {
    urlInput.value = "";
    setStatus("Could not read tab URL.");
  }
}

async function getCurrentTabUrl() {
  const tabs = await browserApi.tabs.query({ active: true, currentWindow: true });
  const tab = tabs && tabs[0] ? tabs[0] : null;
  if (!tab || !tab.url) {
    throw new Error("No active tab URL.");
  }
  return tab.url;
}

function generateQrForCurrentTab() {
  const urlToEncode = (urlInput.value || currentUrl || "").trim();
  if (!urlToEncode) {
    setStatus("No URL found for this tab.");
    return;
  }

  const qrApiUrl = buildQrApiUrl(urlToEncode);
  qrImage.src = qrApiUrl;
  qrImage.style.display = "block";
  downloadButton.disabled = false;
  setStatus("QR code generated.");
}

function buildQrApiUrl(value) {
  const encoded = encodeURIComponent(value);
  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encoded}`;
}

function downloadQrCode() {
  if (!qrImage.src) {
    setStatus("Generate QR code first.");
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = qrImage.src;
  anchor.download = "current-page-qr.png";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setStatus("Download started.");
}

function setStatus(message) {
  statusBox.textContent = message;
}