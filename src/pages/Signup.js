import { padding } from '@mui/system';
import React from 'react';
import InputText from '../components/InputText';
import UserHeader from '../components/UserHeader';

const Signup = () => {
  return (
    <div>
      <UserHeader />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '27px',
        padding: '20px 27px'
      }}>
        <InputText label="아이디" type="text" />
        <InputText label="비밀번호" type="password" />
      </div>
    </div>
  );
};

export default Signup;