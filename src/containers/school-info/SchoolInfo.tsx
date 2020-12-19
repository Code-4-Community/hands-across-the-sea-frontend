import React from 'react';
import { 
    Form
} from 'antd';
import { 
    ContentContainer,
} from '../../components';
import FormFooter from '../../components/form-style/FormFooter';
import SelectSchool from './SelectSchool';
import SchoolInformation from './SchoolInformation';

const SchoolInfo: React.FC = () => {

    const handleSubmit = (event: any) => {
        console.log(event);
    }

    return (
        <ContentContainer>
            <Form name="school-info" onFinish={handleSubmit}>
                <SelectSchool />
                <SchoolInformation />
                <FormFooter />
            </Form>
        </ContentContainer>
    )
}

export default SchoolInfo;
