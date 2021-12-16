import styled from 'styled-components';
import { Typography, Input, Card } from 'antd';
import { LinkButton } from './LinkButton';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const BackButton = styled(LinkButton)`
  margin: auto;
  background: transparent;
  color: #54679e;
`;

export const FormTextArea = styled(TextArea)`
  resize: none;
`;

export const SectionTitle = styled(Title)`
  font-weight: bold;
  padding: 0 0 0.75em 0;
`;

export const ClarifyText = styled(Paragraph)`
  margin: auto;
`;

export const DirectoryTitle = styled(Title)`
  text-align: center;
  margin: 24px; 0px; 24px; 0px;
`;

export const ContentContainer = styled.div`
  display: block;
  padding: 24px;
  margin: auto;
`;

export const Container = styled(ContentContainer)`
  min-width: 960px;
  max-width: 960px;

  .ant-row {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export const Outer = styled.div`
  background-color: #d4d9e7;
  padding: 32px 32px;
  border-radius: 5px;
  margin: auto;
`;

export const Inner = styled.div`
  padding: 32px 32px 32px 32px;
  background-color: white;
  border-radius: 5px;
`;

export const StyledDataCard = styled(Card)`
  width: 261px;
  height: 261px;
  border-radius: 38px;
  text-align: center; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
`;

export const DisplayCard = styled(Card)`
  width: 261; 
  height: 70; 
  borderRadius: 38; 
  textAlign: center;
`
