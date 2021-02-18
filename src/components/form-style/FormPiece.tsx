import React from 'react';
import { Row, Col } from 'antd';
import { ClarifyText } from '..';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface FormPieceProps {
  // description for form item
  readonly note?: string;
  // if piece would like to have a callback
  // for when it is clicked
  readonly onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  // used to determine if we are adding
  // additional pieces (for spacing)
  readonly additionalPiece?: boolean;
  // callback function for removing an
  // addition piece
  readonly removeAdditionPiece?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  // edit padding by given amount from the default (32px)
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
  const padTop =
    props.addPaddingTop !== undefined
      ? `${32 + props.addPaddingTop}px`
      : '32px';
  const padRight =
    props.addPaddingRight !== undefined
      ? `${32 + props.addPaddingRight}px`
      : '32px';
  const padBottom =
    props.addPaddingBottom !== undefined
      ? `${10 + props.addPaddingBottom}px`
      : '10px';
  const padLeft =
    props.addPaddingLeft !== undefined
      ? `${32 + props.addPaddingLeft}px`
      : '32px';

  const Piece = styled.div`
    padding: ${padTop} ${padRight} ${padBottom} ${padLeft};
    background-color: white;
    border-radius: 5px;
  `;

  if (props.additionalPiece) {
    return (
      <Piece onClick={props.onClick}>
        <Row>
          <Col span={12}>
            <ClarifyText>{props.note}</ClarifyText>
          </Col>
          <Col span={12}>
            <MakeRight>
              <DeleteOutlined onClick={props.removeAdditionPiece} />
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
