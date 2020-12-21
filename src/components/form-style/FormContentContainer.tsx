import React from 'react'
import {
    Row,
    Col
} from 'antd';
import { ContentContainer } from '..';
import FormSideBar from './FormSideBar';
import styled from 'styled-components';

interface FormContentContainerProps {
    readonly disableLastTwo?: boolean;
}

const ChildrenContainer = styled.div`
    max-width: 960px;
`;

const FormContentContainer: React.FC<FormContentContainerProps> = (props) => {
    return (
        <ContentContainer>
            <Row>
              <Col span={5}>
                <FormSideBar disableLastTwo={props.disableLastTwo}/>
              </Col>
              <Col span={19}>
                  <ChildrenContainer>
                  {props.children}
                  </ChildrenContainer>
              </Col>
            </Row>
        </ContentContainer>
    )
}

export default FormContentContainer;
