import React from 'react';
import {
    Row,
    Col
} from 'antd';
import { ClarifyText } from '..';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface FormPieceProps {
  note?: string;
  firstPiece?: boolean;
  lastPiece?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  limitPadding?: boolean;
  additionalPiece?: boolean;
  removeAdditionPiece?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MakeRight = styled.div`
    text-align: right;
`;

const FormPiece: React.FC<FormPieceProps> = (props) => {
    
    const first = props.firstPiece ? '0px' : '24px';
    const last = props.lastPiece ? '0px' : '24px';
    const padding = props.limitPadding ? 'padding: 10px 32px 10px 32px;' : 'padding: 32px 32px 10px 32px;';
    
    const Piece = styled.div`
        margin: ${first} 0px ${last} 0px;
        ${padding}
        background-color: #ffffff;
        border-radius: 5px;
    `;
    
    if(props.additionalPiece) {
        return (
            <Piece onClick={props.onClick}>
                <Row>
                    <Col span={12}>
                        <ClarifyText>{props.note}</ClarifyText>
                    </Col>
                    <Col span={12}>
                        <MakeRight>
                            <DeleteOutlined onClick={props.removeAdditionPiece}/>
                        </MakeRight>
                    </Col>
                </Row>
                {props.children}
            </Piece>
        );
    } else {
        return (
            <Piece onClick={props.onClick}>
                <ClarifyText>{props.note}</ClarifyText>
                {props.children}
            </Piece>
        );
    }
};

export default FormPiece;
