import styled from 'styled-components';
import { Typography, Input } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const FormTextArea = styled(TextArea)`
  resize: none;
`;

export const SectionTitle = styled(Title)`
  font-weight: bold;
  padding: 0em 0em 0.75em 0em;
`;

export const ClarifyText = styled(Paragraph)`
  margin: auto;
`;

export const DirectoryTitle = styled(Title)`
  text-align: center;
  margin: 24px; 0px; 24px; 0px;
`;

// max-width: 960px
export const ContentContainer = styled.div`
  display: block;
  padding: 24px;
  margin: auto;
`;

export const Outer = styled.div`
  background-color: #d4d9e7;
  padding: 32px 32px 32px 32px;
  border-radius: 5px;
  margin: auto;
`;

export const Inner = styled.div`
  padding: 32px 32px 32px 32px;
  background-color: white;
  border-radius: 5px;
`;
