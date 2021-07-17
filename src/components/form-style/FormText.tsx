import React from 'react';

interface FormTextProps {
  value?: string;
}

const FormText: React.FC<FormTextProps> = ({ value }) => {
  return <span>{value}</span>;
};

export default FormText;
