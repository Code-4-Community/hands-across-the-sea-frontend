import React from 'react';
import { Row, Col, Typography } from 'antd';
import { ClarifyText } from '..';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

type LevelOptions = 1 | 2 | 3 | 4 | 5 | undefined;

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
  // if piece is last piece then we do not need to add bottom margin
  readonly lastPiece?: boolean;
  // if we want note to be a title we have it include a level
  readonly level?: LevelOptions;
}

const { Title } = Typography;

const MakeRight = styled.div`
  text-align: right;

  &:hover {
    color: #ff0000;
  }
`;

const BigClarify = styled(Title)`
  margin: auto;
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
  const bottomMargin = props.lastPiece !== undefined ? '0px' : '24px';

  const Piece = styled.div`
    padding: ${padTop} ${padRight} ${padBottom} ${padLeft};
    background-color: white;
    border-radius: 5px;
    margin: 0px 0px ${bottomMargin} 0px;
  `;

  if (props.additionalPiece) {
    return (
      <Piece onClick={props.onClick}>
        <Row>
          <Col span={12}>
            {props.level ? (
              <BigClarify level={props.level}>{props.note}</BigClarify>
            ) : (
              <ClarifyText>{props.note}</ClarifyText>
            )}
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
        {props.level ? (
          <BigClarify level={props.level}>{props.note}</BigClarify>
        ) : (
          <ClarifyText>{props.note}</ClarifyText>
        )}
        {props.children}
      </Piece>
    );
  }
};

export default FormPiece;
