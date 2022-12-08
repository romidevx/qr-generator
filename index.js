
// FORM 
let form = document.querySelector('.form');

// FORM INPUT ON SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newLink = form.link.value;

    if(!newLink){
        alert('*** Plase enter a valid link to generate the Qr Code image ***');
        return;
    }

    generateQrCode(newLink);
})

// CHECK IF QrCode LINK ENTERED IS VALID
function isValid(link){
    let splitLink = link.trim().split(':');
    console.log(splitLink);

    if(splitLink[0] == 'https' || splitLink[0] == 'http'){
        return true;
    }

    return false;
}

// GENERATE QrCode IMAGE
function generateQrCode(qrCodeLink){
    document.querySelector('.qrcode').innerHTML = '';

    if (!isValid(qrCodeLink)) {
        alert('... Please enter a valid internet link ...');
        form.reset();
        form.link.focus();
        document.querySelector('.reset-form-btn').style.display = 'none'
        return;
    } 

    new QRCode(document.querySelector('.qrcode'), qrCodeLink); 

    setTimeout( Generate_Download_Button, 1000);
} 


// GENERATE QrCode DOWNLOAD BUTTON  
function Generate_Download_Button(){
    let qrCodeLink = document.querySelector('.qrcode img').src;
    let qrCode_Download_Name = 'QrCode_Date_' + new Date().toLocaleDateString() +'_Time_'+ new Date().toLocaleTimeString();

    document.querySelector('.qrcode').innerHTML +=`
        <a href="${qrCodeLink}" download='${qrCode_Download_Name}' title='Download QrCode'> Download Qr Code </a>
    `;

    document.querySelector('.reset-form-btn').style.display = 'block';
}

// CLEAR FORM INPUT
document.querySelector('.reset-form-btn').addEventListener('click',() => {
    document.querySelector('.qrcode').innerHTML = '';
    document.querySelector('.reset-form-btn').style.display = 'none';
    form.reset();
    form.link.focus();
})