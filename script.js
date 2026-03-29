// Its time to make it working 

// dom 
const inputText = document.getElementById("inputText");
const sizeSelect = document.getElementById("size");
const generateBtn = document.getElementById("generateBtn");
const qrSection = document.getElementById("qrSection");
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");

// state variables 
let qrCodeInstance = null;

let qrCodeDataUrl = "";

//  now click event for the generate btn :
generateBtn.addEventListener("click", () =>{
  const text = inputText.value.trim();

  if(!text){
    alert("Please enter some text or URL");
    return;
  }

  const size = parseInt(sizeSelect.value);

  qrContainer.innerHTML = "";

  if (typeof QRCode === "undefined"){
    alert("QR Code library is still loading. Please wait a moment and try again.");
    return;
  }

  // lets do something : How to make the qr code awesome part of my code :)

  qrCodeInstance = new QRCode(qrContainer,{
    text,

    width:size,
    height:size,

    colorDark: "#000",
    colorLight : "#fff",

    correctionLevel : QRCode.CorrectLevel.H,
  });


  setTimeout(() => {
    const canvas = qrContainer.querySelector("canvas");
    if(canvas){
      qrCodeDataUrl = canvas.toDataURL("image/png");
      qrSection.classList.add("show");
    }
  },100);

})

downloadBtn.addEventListener("click", () =>{
  if(!qrCodeDataUrl)  return;

  const link = document.createElement("a");

  link.download = "qrcode.png";
  link.href = qrCodeDataUrl;
  link.click();
})

inputText.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    generateBtn.click();
  }});
