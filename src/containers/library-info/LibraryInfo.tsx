import React, { useState } from 'react'
import {
    Radio,
    Form
} from 'antd';
import YesLibrary from './YesLibrary';
import NoLibrary from './NoLibrary';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';

const LibraryInfo: React.FC = () => {

    const [noLibrary, setNoLibrary] = useState<boolean>();

    const handleLibraryStatus = (event: any) => {
        setNoLibrary(event.target.value === 'no'); 
    }

    return (
        <FormContentContainer disableLastTwo={noLibrary}>
            <Form>
                <FormContainer title="Library Information">
                    <FormPiece firstPiece lastPiece={noLibrary === undefined} note="Is there a library?">
                        <Form.Item name="isThereLibrary">
                            <Radio.Group buttonStyle="solid" onChange={handleLibraryStatus}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                                <Radio.Button value="in-progress">In Progress</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </FormPiece>
                    {noLibrary ? (<NoLibrary />) : (<YesLibrary />)}
                </FormContainer>
                <FormFooter submit={noLibrary}/>    
            </Form>            
        </FormContentContainer>
    )
}

export default LibraryInfo;
