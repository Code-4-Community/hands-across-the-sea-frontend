import React from 'react';
import {
    Row,
    Col
} from 'antd';
import { ClarifyText } from '..';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface FormPieceProps {
  readonly note?: string;
  readonly firstPiece?: boolean;
  readonly lastPiece?: boolean;
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  readonly limitPadding?: boolean;
  readonly additionalPiece?: boolean;
  readonly removeAdditionPiece?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  readonly left?: boolean;
  readonly right?: boolean;
}

const MakeRight = styled.div`
    text-align: right;

    &:hover {
        color: red;
    }
`;

const FormPiece: React.FC<FormPieceProps> = (props) => {
    
    let top = props.firstPiece ? '0px' : '24px';
    let bottom = props.lastPiece ? '0px' : '24px';
    const padding = props.limitPadding ? 'padding: 10px 32px 10px 32px;' : 'padding: 32px 32px 10px 32px;';
    let left = props.left ? '0px' : '10px';
    props.left && (props.lastPiece || props.firstPiece) ? top = '0px' : top = top;
    let right = props.right ? '0px' : '10px';
    props.right && (props.lastPiece || props.firstPiece) ? top = '0px' : top = top;

    
    const Piece = styled.div`
        margin: ${top} ${right} ${bottom} ${left};
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
