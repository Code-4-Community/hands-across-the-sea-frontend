import React, { useState } from 'react'
import {
    Radio,
    Select,
    Form,
    Row,
    Col,
    Input
} from 'antd';
import FormPiece from '../../components/form-style/FormPiece';
import { ClarifyText } from '../../components';

const { Option } = Select;

const NoLibrary: React.FC = () => {

    const [assignedToLibrary, setAssignedToLibrary] = useState<boolean>();
    const [otherTitle, setOtherTitle] = useState<boolean>();
    const [hasApprenticeship, setHasApprenticeship] = useState<boolean>();
    
    const handleChangeAssignedLibrary = (event: any) => {
            setAssignedToLibrary(event.target.value === 'yes-full-time' || event.target.value === 'yes-part-time');
    }
    
    const handleChangeTitle = (event: any) => {
        setOtherTitle(event.value === 'other');
    }

    const handleChangeApprenticeship = (event: any) => {
        setHasApprenticeship(event.target.value === 'yes');
    }

    const bottomGutter = !hasApprenticeship ? 0 : 24;

    return (
        <div>
            <Row gutter={[0,24]}>
                <Col flex={24}>
                    <Row gutter={[24,0]}>
                        <Col span={12}>
                            <FormPiece addPaddingBottom={21} note="Is the library only a library, or shared space?">
                                <Form.Item name="isLibrarySharedSpace">
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="only-library">Only library</Radio.Button>
                                        <Radio.Button value="shared-space">Shared space</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </FormPiece>
                        </Col>
                        <Col span={12}>
                            <FormPiece note="Does the library have inviting places for children and teacher to sit and read?">
                                <Form.Item name="doesLibraryHaveInvitingSpace">
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="yes">Yes</Radio.Button>
                                        <Radio.Button value="no">No</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </FormPiece>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <Row gutter={[0,24]}>
                <Col flex={24}>
                    <FormPiece note="Is someone assigned to this school's library?">
                        <Form.Item name="assignedToLibrary">
                            <Radio.Group buttonStyle="solid" onChange={handleChangeAssignedLibrary}>
                                <Radio.Button value="yes-full-time">Yes, full time</Radio.Button>
                                <Radio.Button value="yes-part-time">Yes, part time</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {assignedToLibrary && <div>
                            <ClarifyText>What is the title of this peron assigned to the library?</ClarifyText>
                            <Form.Item name="titleOfPersonAssignedToLibrary">
                                <Select placeholder="Select the title" onChange={handleChangeTitle} labelInValue>
                                    <Option value="librarian">Librarian</Option>
                                    <Option value="school-secretary">School Secretary</Option>
                                    <Option value="classroom-teacher">Classroom Teacher</Option>
                                    <Option value="apprentice">Apprentice</Option>
                                    <Option value="pvc">PVC</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                            {otherTitle &&
                                <Form.Item name="otherTitleOfPersonAssignedToLibrary">
                                    <Input placeholder="Other:"/>
                                </Form.Item>}
                        </div>}
                    </FormPiece>
                </Col>
            </Row>

            <Row gutter={[0,bottomGutter]}>
                <Col flex={24}>
                    <FormPiece note="Does this school have a known apprenticeship program in the library?">
                        <Form.Item name="haveApprenticeProgram">
                            <Radio.Group buttonStyle="solid" onChange={handleChangeApprenticeship}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {hasApprenticeship && 
                            <Form.Item name="apprenticeshipType">
                                <Select placeholder="Select the program">
                                    <Option value="oecs-yes">OECS YES</Option>
                                    <Option value="nep">NEP</Option>
                                    <Option value="waiting-on-amanda">Another waiting on/from Amanda</Option>
                                </Select>
                            </Form.Item>}
                    </FormPiece>
                </Col>
            </Row>
            
            {hasApprenticeship &&
                <Row gutter={[0,0]}>
                    <Col flex={24}>
                        <FormPiece note="Do you train and mentor the apprentices in the library">
                            <Form.Item name="doTrainAndMentorApprentices">
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </FormPiece>
                    </Col>
                </Row>
            }

        </div>
    )
}

export default NoLibrary;
