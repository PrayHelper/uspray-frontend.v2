import CryptoJS from 'crypto-js';
 

const secretKey = process.env.REACT_APP_AES_SECRETKEY; 

//암호화
export const encrypt = (val) => {
    // const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), secretKey);
    const result = btoa(val);
    // let result = encrypted.toString()
    return encodeURIComponent(result)
} 