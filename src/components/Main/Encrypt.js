import CryptoJS from 'crypto-js';
 

const secretKey = process.env.REACT_APP_AES_SECRETKEY; 

//암호화
export const encrypt = (val) => {
    const text = val.toString();
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), secretKey);

    let result = encrypted.toString()
    console.log(CryptoJS.AES.decrypt(result, secretKey));
    return encodeURIComponent(result)
} 
 
 
//복호화
export const decrypt = (encrypted) => {
    var decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);
 
    return decrypted.toString(CryptoJS.enc.Utf8);
}