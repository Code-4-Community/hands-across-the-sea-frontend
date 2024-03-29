import React from 'react';
import styled from 'styled-components';
import getColorPalette from '../../utils/colors';

const FormButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: -24px;
`;

const FormButtonElement = styled.button`
  padding: 5px 12px;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  min-width: 160px;
  margin-right: 24px;
`;

interface FormButtonsSubComponents {
  Button: typeof FormButton;
}

const FormButtons: React.FC & FormButtonsSubComponents = ({ children }) => {
  return <FormButtonsContainer>{children}</FormButtonsContainer>;
};

interface FormButtonProps {
  text: string;
  type: 'primary' | 'secondary';
  disabled?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  type,
  disabled,
  isSubmit,
  onClick,
}) => {
  const cursor = disabled ? 'default' : 'pointer';
  const opacity = disabled ? 0.5 : 1;
  const backgroundColor =
    type === 'primary' ? getColorPalette().primary : getColorPalette().tertiary;
  const foregroundColor =
    type === 'primary'
      ? getColorPalette().lightText
      : getColorPalette().darkText;
  return (
    <FormButtonElement
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor, color: foregroundColor, cursor, opacity }}
    >
      {text}
    </FormButtonElement>
  );
};

FormButtons.Button = FormButton;

export default FormButtons;
