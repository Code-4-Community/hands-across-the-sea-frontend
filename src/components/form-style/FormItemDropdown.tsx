import React from 'react';
import { Form, Select } from 'antd';
import { ClarifyText } from '..';
import { getOptionsFromEnum } from '../../utils/helpers';

interface FormPieceDropdownProps {
  readonly optionsEnum: { [s: number]: string };
  readonly name: string;
  readonly text: string;
  readonly clarifyText?: string;
  readonly onChange?: (event: any) => void;
}

const FormItemDropdown: React.FC<FormPieceDropdownProps> = (props) => {
  return (
    <>
      {props.clarifyText && <ClarifyText>{props.clarifyText}</ClarifyText>}
      <Form.Item name={props.name}>
        <Select placeholder={props.text} onChange={props.onChange}>
          {getOptionsFromEnum(props.optionsEnum)}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormItemDropdown;
