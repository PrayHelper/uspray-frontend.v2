import styled from "styled-components";


export const WrapperStyle = styled.div`
    position: relative;
    border: ${props => props.isFocused ? "2px" : "1px"} solid ${props => props.isError ? "#FF6B6B" : "#7BAB6E"};
    border-radius: 15px;
    margin: ${props=> props.isFocused ? "-1px" : "0px"};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &:hover{
        border: 2px solid ${props => props.isError ? "#FF6B6B" : "#7BAB6E"};
        margin: -1px;
    }
`;

export const LabelStyle = styled.span`
    position: absolute;
    top: ${props => props.isFocused ? "0px" : "50%"};
    left: 9px;
    transform: translateY(-50%);

    font-size: ${props => props.isFocused ? "12px" : "16px"};
    color: ${props => props.isError ? "#FF6B6B" : "#7BAB6E"};
    padding: 0px 5px;
    z-index: ${props => props.isFocused ? "0" : "-1"};

    background-color: white;
    transition: 0.2s;
`;

export const InputStyle = styled.input`
    width: 100%;
    padding: 16.5px 14px;
    border: none;

    background: transparent;
    &:focus {
        outline: none;
    };
    font-size: 16px;
    color: ${props => props.isError ? "#FF6B6B" : "#7BAB6E"};
`;

export const DescriptionStyle = styled.div`
    font-size: 10px;
    font-weight: 500;
    margin-right: 12px;
    white-space: nowrap;
    color: ${props => props.isError ? "#FF6B6B" : "#7BAB6E"};
`;