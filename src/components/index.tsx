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
`

//max-width: 960px
export const ContentContainer = styled.div`
  display: block;
  padding: 24px;
  margin: auto;
`;
