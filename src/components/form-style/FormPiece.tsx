import React from 'react';
import { ClarifyText } from '..';
import styled from 'styled-components';

interface FormPieceProps {
  note: string;
  firstPiece: boolean;
  lastPiece: boolean;
}


const FormPiece: React.FC<FormPieceProps> = (props) => {
    
    const first = props.firstPiece ? '0px' : '24px';
    const last = props.lastPiece ? '0px' : '24px';
    
    const Piece = styled.div`
        margin: ${first} 0px ${last} 0px;
        padding: 32px 32px 20px 32px;
        background-color: #ffffff;
        border-radius: 5px;
    `;
  
    return (
      <Piece>
          <ClarifyText>{props.note}</ClarifyText>
          {props.children}
      </Piece>
    );
};

export default FormPiece;
