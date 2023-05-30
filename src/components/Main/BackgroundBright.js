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
    position: absolute;
    // top: 147px;
    // left: 0;
    // right: 0;
    // bottom: 0;
    display: flex;
    width: 100%;
    min-height:710px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상 */
`
export default BackgroundBright;