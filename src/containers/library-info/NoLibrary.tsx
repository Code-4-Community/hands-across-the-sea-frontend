import React from 'react'
import {
    Radio,
    Form,
    Row,
    Col,
    Checkbox
} from 'antd';
import FormPiece from '../../components/form-style/FormPiece';
import { FormTextArea } from '../../components';


const NoLibrary: React.FC = () => {
    return (
        <div>
            <FormPiece note="Why isn't there a library?">
                <Form.Item name="whyNoLibrary">
                    <FormTextArea placeholder="Please enter your answer here" />
                </Form.Item>
            </FormPiece>

            <FormPiece note="Is this school working towards a library / do they want a library?">
                <Form.Item name="workingTowardsLibrary">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </FormPiece>

            <Row>
                <Col span={12}>
                    <FormPiece firstPiece left note="Is this school working towards a library / do they want a library?">
                        <Form.Item name="workingTowardsWantLibrary">
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                             </Radio.Group>
                        </Form.Item>
                    </FormPiece>
                </Col>
                <Col span={12}>
                    <FormPiece firstPiece left note="Does this school have a designated space for a library?">
                        <Form.Item name="designatedSpaceForLibrary">
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </FormPiece>
                </Col>
            </Row>

            <FormPiece note="Where are they in the process? (Check all that apply)">
                <Form.Item name="whereInProcess">
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="found-a-space">Found a space</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="looking-for-a-space">Looking for a space</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="have-a-space-but-no-books">Have a space, but no books</Checkbox>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="working-on-convincing-principal">Working on convincing principal</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="need-furniture">Need furniture</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="starting-the-conversation">Starting the conversation</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </FormPiece>

            <FormPiece note="When would they be ready?">
                <Form.Item name="whenWouldTheyBeReady">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="upcoming-school-year">Upcoming School Year</Radio.Button>
                        <Radio.Button value="year-after-next">Year After Next</Radio.Button>
                        <Radio.Button value="more-than-2-years">More Than 2 Years Out</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </FormPiece>

        </div>
    )
}

export default NoLibrary;
