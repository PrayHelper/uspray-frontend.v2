import styled from "styled-components";

// const BackgroundBright = styled.div`
//     position: absolute;
//     top: 155px;
//     width: 430px;
//     max-height: 10000px; 
//     height: 90vh;
//     background: rgba(0, 0, 0, 0.5);
// `
// 여기서 height에 10000px로 설정해둔것이 문제임.
const BackgroundBright = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상 */
    z-index: 101;
    transition : all 0.5s ease-in-out;
`
export default BackgroundBright;