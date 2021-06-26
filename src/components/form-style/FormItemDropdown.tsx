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
}

const FormItemDropdown: React.FC<FormPieceDropdownProps> = ({
  clarifyText,
  name,
  text,
  optionsEnum,
  onChange,
  required,
}) => {
  return (
    <>
      {clarifyText && <ClarifyText>{clarifyText}</ClarifyText>}
      <Form.Item
        name={name}
        rules={[
          { required: required || true, message: 'This field is required' },
        ]}
      >
        <Select placeholder={text} onChange={onChange}>
          {getOptionsFromEnum(optionsEnum)}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormItemDropdown;
