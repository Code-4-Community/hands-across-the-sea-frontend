import React from 'react';
import { Spin } from 'antd';
import FormContentContainer from './form-style/FormContentContainer';
import FormContainer from './form-style/FormContainer';

interface LoadingProps {
  title: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <FormContentContainer title={props.title}>
      <FormContainer title={''}>
        <Spin size={'large'} />
      </FormContainer>
    </FormContentContainer>
  );
};

export default Loading;
