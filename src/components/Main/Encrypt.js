//암호화
export const encrypt = (val) => {
    const result = btoa(val);
    return encodeURIComponent(result)
} 