import React from 'react';
import {
    Button,
    Row,
    Col
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ContentContainer } from '../components';

const FormFooter:React.FC = () => {
    
    return (
        <>
          <ContentContainer>
              <Row>
                  <Col push={11} span={16}>
                      <Button
                        type="primary"
                        ghost>
                          Save Progress
                      </Button>
                  </Col>
                  <Col push={4} span={8}>
                      <Button
                        size="large"
                        type="text"
                        icon={<ArrowRightOutlined />}
                        ghost>
                            Next Section
                      </Button>
                  </Col>
              </Row>
          </ContentContainer>  
        </>
    )
}

export default FormFooter;
