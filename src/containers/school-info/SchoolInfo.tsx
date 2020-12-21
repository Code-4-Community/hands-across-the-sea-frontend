import React from 'react';
import { 
    Form,
    Row,
    Col
} from 'antd';
import { 
    ContentContainer,
} from '../../components';
import FormFooter from '../../components/form-style/FormFooter';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import SelectSchool from './SelectSchool';
import SchoolInformation from './SchoolInformation';

const SchoolInfo: React.FC = () => {

    const handleSubmit = (event: any) => {
        console.log(event);
    }

    return (
        <FormContentContainer>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Form name="school-info" onFinish={handleSubmit}>
                        <SelectSchool />
                        <SchoolInformation />
                        <FormFooter />
                    </Form>
                </Col>
            </Row>
        </FormContentContainer>
    )
}

export default SchoolInfo;
