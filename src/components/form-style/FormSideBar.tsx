import React from 'react';
import { ContentContainer } from '..';
import { LinkButton } from '../LinkButton';
import styled from 'styled-components';

interface FormSideBarProps {
    disableLastTwo?: boolean;
}

const FormSideBar: React.FC<FormSideBarProps> = (props) => {

    const page = window.location.pathname;
    const reasonForVisitClass = page === '/reason-for-visit' ? 'currPage' : '';
    const schoolInfoClass = page === '/school-info' ? 'currPage' : '';
    const studentBookInfoClass = page === '/student-book-information' ? 'currPage' : '';
    const libraryInfoClass = page === '/library-info' ? 'currPage' : '';
    const monitoringInfoClass = page === '/monitoring-information' ? 'currPage' : '';
    const trainingMentorClass = page === '/training-and-mentoring-information' ? 'currPage' : '';

    const FormLinkButton = styled(LinkButton)`
        text-align: left;
        padding: 0px 0px 2.25em 0px;

        &.currPage {
            font-weight: bold;
            font-size: 18px;
            color: #294186;
        }
    `;

    return (
        <ContentContainer>
            <FormLinkButton 
                block 
                className={reasonForVisitClass} 
                to="/reason-for-visit"
                type="text">
                    Reason for Visit</FormLinkButton>
            <FormLinkButton 
                block 
                className={schoolInfoClass} 
                to="/school-info"
                type="text">
                    School Info</FormLinkButton>
            <FormLinkButton 
                block 
                className={studentBookInfoClass} 
                to="/student-book-information"
                type="text">
                    Student and Book Info</FormLinkButton>
            <FormLinkButton 
                block 
                className={libraryInfoClass} 
                to="/library-info"
                type="text">
                    Library Info</FormLinkButton>
            <FormLinkButton 
                block 
                className={monitoringInfoClass} 
                to="/monitoring-information"
                type="text"
                disabled={props.disableLastTwo}>
                    Monitoring Info</FormLinkButton>
            <FormLinkButton 
                block 
                className={trainingMentorClass} 
                to="/training-and-mentoring-information"
                type="text"
                disabled={props.disableLastTwo}>
                    Training and Mentorship</FormLinkButton>
        </ContentContainer>
    )
}

export default FormSideBar;
