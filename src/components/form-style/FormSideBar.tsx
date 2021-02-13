import React from 'react';
import { ContentContainer } from '..';
import { LinkButton } from '../LinkButton';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface FormSideBarProps {
  // used when the NO flow is selected to
  // prevent further form filling out
  disableLastTwo?: boolean;
}

interface Paths {
  readonly name: string;
  readonly link: string;
}

const FormSideBar: React.FC<FormSideBarProps> = (props) => {
  const location = useLocation();

  const page = location.pathname;

  const paths: Paths[] = [
    { name: 'Select School', link: '/select-school' },
    { name: 'School Info', link: '/school-info' },
    { name: 'Student and Book Info', link: '/student-book-information' },
    { name: 'Library Info', link: '/library-info' },
    { name: 'Monitoring Info', link: '/monitoring-information' },
    {
      name: 'Training and Mentorship',
      link: '/training-and-mentoring-information',
    },
  ];

  const disabledPaths: string[] = [
    '/monitoring-information',
    '/training-and-mentoring-information',
  ];

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
        pp.link === page ? (
          <ActiveFormLinkButton
            block
            to={pp.link}
            type="text"
            disabled={props.disableLastTwo && disabledPaths.includes(pp.link)}
          >
            {pp.name}
          </ActiveFormLinkButton>
        ) : (
          <FormLinkButton
            block
            to={pp.link}
            type="text"
            disabled={props.disableLastTwo && disabledPaths.includes(pp.link)}
          >
            {pp.name}
          </FormLinkButton>
        ),
      )}
    </ContentContainer>
  );
};

export default FormSideBar;
