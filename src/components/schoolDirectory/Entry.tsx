import React from 'react';
import styled from 'styled-components';

const Piece = styled.div`
  padding: 32px;
  background-color: white;
  border-radius: 5px;
`;

const Entry: React.FC = () => {
  return (
    <Piece>
      <p>H</p>
    </Piece>
  );
};

export default Entry;
