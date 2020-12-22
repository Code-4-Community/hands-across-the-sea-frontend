import React, { useState } from 'react'
import {
    Radio,
    Form,
    Row,
    Col
} from 'antd';
import YesLibrary from './YesLibrary';
import NoLibrary from './NoLibrary';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';

const LibraryInfo: React.FC = () => {

    const [noLibrary, setNoLibrary] = useState<boolean>(false);
    const [yesLibrary, setYesLibrary] = useState<boolean>(false);

    const handleLibraryStatus = (event: any) => {
        setNoLibrary(event.target.value === 'no'); 
        setYesLibrary(event.target.value === 'yes' || event.target.value === 'in-progress');
    }

    const gutter: number = noLibrary || yesLibrary ? 24 : 0;

    return (
        <FormContentContainer disableLastTwo={noLibrary}>
            <Form>
                <FormContainer title="Library Information">
                <Row gutter={[0, gutter]}>
                    <Col flex={24}>
                        <FormPiece note="Is there a library?">
                            <Form.Item name="isThereLibrary">
                                <Radio.Group buttonStyle="solid" onChange={handleLibraryStatus}>
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="in-progress">In Progress</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </FormPiece>
                    </Col>
                </Row>
                    {noLibrary && <NoLibrary />}
                    {yesLibrary && <YesLibrary />}
                </FormContainer>
                <FormFooter submit={noLibrary}/>    
            </Form>            
        </FormContentContainer>
    )
}

export default LibraryInfo;
