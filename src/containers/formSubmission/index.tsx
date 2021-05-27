import React from 'react';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import { Typography } from 'antd';
import { useHistory } from 'react-router';
import { Routes } from '../../App';

const { Paragraph, Link } = Typography;

const FormSubmission: React.FC = () => {
  const history = useHistory();

  return (
    <FormContentContainer>
      <FormContainer title="Form submitted!">
        <FormPiece addPaddingTop={-24}>
          <Paragraph>
            Thank you for submitting the Library Monitoring Form.
          </Paragraph>
          <Paragraph>Your responses have been recorded.</Paragraph>
          <Link underline onClick={() => history.replace(Routes.HOME)}>
            You can return home here.
          </Link>
        </FormPiece>
      </FormContainer>
    </FormContentContainer>
  );
};

export default FormSubmission;
