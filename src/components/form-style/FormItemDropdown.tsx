import { Form, Select } from 'antd';
import React from 'react';
import { ClarifyText } from '..';
import { getOptionsFromEnum } from '../../utils/helpers';

interface FormPieceDropdownProps {
  readonly optionsEnum: { [s: number]: string };
  readonly name: string;
  readonly text: string;
  readonly clarifyText?: string;
  readonly onChange?: (event: any) => void;
  readonly required?: boolean;
  readonly disabled?: boolean;
}

const FormItemDropdown: React.FC<FormPieceDropdownProps> = ({
  clarifyText,
  name,
  text,
  optionsEnum,
  onChange,
  required,
  disabled,
}) => {
  return (
    <>
      {clarifyText && <ClarifyText>{clarifyText}</ClarifyText>}
      <Form.Item name={name} rules={[{ required: required, message: 'Required' }]}>
        <Select placeholder={text} onChange={onChange} disabled={disabled}>
          {getOptionsFromEnum(optionsEnum)}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormItemDropdown;
