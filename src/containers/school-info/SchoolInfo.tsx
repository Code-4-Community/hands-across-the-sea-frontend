import React from 'react';
import { 
    Form,
    Row,
    Col
} from 'antd';
import FormFooter from '../../components/form-style/FormFooter';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import SelectSchool from './SelectSchool';
import SchoolInformation from './SchoolInformation';

const SchoolInfo: React.FC = () => {

    const handleSubmit = (event: any): void => {
       // console.log(event);
    }

    return (
        <FormContentContainer>
            <Row>
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
