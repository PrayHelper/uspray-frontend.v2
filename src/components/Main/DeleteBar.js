import React from 'react';
import styled from 'styled-components';
import delete_btn from '../../images/Delete_btn.svg';
import Logo from './Logo';

const Delete_btn = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 382px;
    height: 251px;
    z-index: 7;
    background: #FFFFFF;
    border-radius: 16px;
`
const DeleteImg = styled(Logo)`
    margin-right: 171px;
    margin-left: 171px;
    margin-top: 24px;
    margin-bottom: 8px;
    width: 40px;
    height: 40px;
`;

const Deletefont = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.02em;

    color: #FF6B6B;
`
const Btn_set = styled.button`
    height: 58px;
    width: 171px;
    background: #F0F0F0;
    border-radius: 16px;
    border: 1px solid white;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height */

    text-align: center;

    color: #808080;
`

const DeleteBar = ({deleteBtnClick, onDeleted, id}) => {
    return (
        <Delete_btn>
            <DeleteImg src={delete_btn}/>
            <Deletefont>정말 삭제하시겠습니까?</Deletefont>
            <Deletefont style={{fontWeight: "400", fontSize:'18px', lineHeight:'26px', marginTop:'2px', marginBottom:'42px'}}>다른 목록에서 확인할 수 었습니다.</Deletefont>
            <div style={{height:'58px', marginBottom:'16px', display:'flex'}}>
                <Btn_set style={{marginLeft:'16px', marginRight:'8px'}} onClick={onDeleted}>취소</Btn_set>
                <Btn_set style={{marginRight: '16px', background:"#FF6B6B", color:'#FFFFFF'}} onClick={() => deleteBtnClick(id)}>삭제</Btn_set>
            </div>
        </Delete_btn>
    );
};

export default DeleteBar;