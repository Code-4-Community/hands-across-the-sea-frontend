import React from 'react';
import { Form, Radio } from 'antd';
import FormPiece from './FormPiece';

interface FormPieceBooleanProps {
  // description for form item
  readonly note?: string;
  // edit padding by given amount from the default (32px)
  readonly addPaddingBottom?: number;
  readonly name?: string;
  readonly textTrue?: string;
  readonly textFalse?: string;
  readonly value?: any;
  readonly onChange?: (event: any) => void;
}

const FormPieceBoolean: React.FC<FormPieceBooleanProps> = (props) => {
  return (
    <FormPiece addPaddingBottom={props.addPaddingBottom} note={props.note}>
      <Form.Item
        name={props.name}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Radio.Group
          buttonStyle="solid"
          onChange={props.onChange}
          value={props.value}
          style={{ userSelect: 'none' }}
        >
          <Radio.Button value={true}>{props.textTrue || 'Yes'}</Radio.Button>
          <Radio.Button value={false}>{props.textFalse || 'No'}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {props.children}
    </FormPiece>
  );
};

export default FormPieceBoolean;
