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
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  readonly additionalPiece?: boolean;
  readonly removeAdditionPiece?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  readonly addPaddingBottom?: number;
  readonly addPaddingTop?: number;
  readonly addPaddingLeft?: number;
  readonly addPaddingRight?: number;
}

const MakeRight = styled.div`
    text-align: right;

    &:hover {
        color: red;
    }
`;

const FormPiece: React.FC<FormPieceProps> = (props) => {
    
    const padTop = props.addPaddingTop !== undefined ? `${32 + props.addPaddingTop}px` : '32px';
    const padRight = props.addPaddingRight !== undefined ? `${32 + props.addPaddingRight}px` : '32px';
    const padBottom = props.addPaddingBottom !== undefined ? `${10 + props.addPaddingBottom}px` : '10px';
    const padLeft = props.addPaddingLeft !==  undefined ? `${32 + props.addPaddingLeft}px` : '32px';

    const Piece = styled.div`
        padding: ${padTop} ${padRight} ${padBottom} ${padLeft};
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
