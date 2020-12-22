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
    
    let padTop = props.addPaddingTop != undefined ? `${32 + props.addPaddingTop}px` : '32px';
    let padRight = props.addPaddingRight != undefined ? `${32 + props.addPaddingRight}px` : '32px';
    let padBottom = props.addPaddingBottom != undefined ? `${10 + props.addPaddingBottom}px` : '10px';
    let padLeft = props.addPaddingLeft != undefined ? `${32 + props.addPaddingLeft}px` : '32px';
    
    /*
    let textTop = props.addPaddingTop != undefined ? `${props.addPaddingTop}px` : '0px';
    let textRight = props.addPaddingRight != undefined ? `${props.addPaddingRight}px` : '0px';
    let textBottom = props.addPaddingBottom != undefined ? `${props.addPaddingBottom}px` : '0px';
    let textLeft = props.addPaddingLeft != undefined ? `${props.addPaddingLeft}px` : '0px';

    const Text = styled(ClarifyText)`
        padding: ${textTop} ${textRight} ${textBottom} ${textLeft};
    `;
    */

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
