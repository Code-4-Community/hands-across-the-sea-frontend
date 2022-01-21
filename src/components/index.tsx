import styled from 'styled-components';
import { Card, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

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
  margin: 24px 0px 24px 0px;
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
  background-color: rgb(80, 188, 190, 0.75);
  padding: 32px 32px;
  border-radius: 5px;
  margin: auto;
`;

export const Inner = styled.div`
  padding: 32px 32px 32px 32px;
  background-color: white;
  border-radius: 5px;
`;

export const InputLabel = styled(Paragraph)`
  margin-bottom: 0.25em !important;
  margin-top: none !important;
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
  width: 261px;
  min-height: 70px;
  border-radius: 38px;
  text-align: center;
`;
