import React from 'react';
import { ContentContainer } from '..';
import { LinkButton } from '../LinkButton';
import styled from 'styled-components';

interface FormSideBarProps {
  disableLastTwo?: boolean;
}

const FormSideBar: React.FC<FormSideBarProps> = (props) => {
  const page = window.location.pathname;

  const paths: string[] = ['/reason-for-visit', 
    '/school-info', '/student-book-information', 
    '/library-info', '/monitoring-information',
    '/training-and-mentoring-information'];

  const pathNames: string[] = ['Reason To Visit', 
    'School Info', 'Student And Book Info', 
    'Library Info', 'Monitoring Info',
    'Training and Mentorship'];

  const FormLinkButton = styled(LinkButton)`
    text-align: left;
    padding: 0px 0px 2.25em 0px;
  `;

  const ActiveFormLinkButton = styled(FormLinkButton)`
    font-weight: bold;
    font-size: 18px;
    color: #294186;
  `;

  return (
    <ContentContainer>
      {paths.map((pp, ii) => 
        pp === page ? 
        <ActiveFormLinkButton
          block
          to={paths[ii]}
          type="text"
          disabled={props.disableLastTwo}>
            {pathNames[ii]} 
        </ActiveFormLinkButton> 
        : 
        <FormLinkButton
          block
          to={paths[ii]}
          type="text"
          disabled={props.disableLastTwo}>
            {pathNames[ii]} 
        </FormLinkButton>
      )}
    </ContentContainer>
  );
};

export default FormSideBar;
