import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const SectionTitle = styled(Title)`
  font-weight: bold;
  padding: 0em 0em 0.75em 0em;
`;

export const ClarifyText = styled(Paragraph)`
  margin: auto;
`;

export const ContentContainer = styled.div`
  display: block;
  padding: 24px;
  max-width: 960px;
  margin: auto;
`;
