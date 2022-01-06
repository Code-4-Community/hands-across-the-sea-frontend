import { Empty } from 'antd';
import React from 'react';
import { StyledSelect } from './index';

interface SelectDropDownProps {
  readonly selectedButton: string;
  readonly value: any;
  readonly onChange: (dv: any) => void;
  readonly placeholder?: string;
  readonly noDataText?: string;
  readonly loading?: boolean;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  selectedButton,
  value,
  onChange,
  placeholder,
  noDataText,
  loading,
  children,
}) => {
  return (
    <StyledSelect
      placeholder={placeholder || 'Search'}
      value={value}
      loading={loading || false}
      showSearch
      allowClear
      onChange={(v) => onChange(v)}
      notFoundContent={
        <Empty
          description={
            <span>{noDataText || `No ${selectedButton} data found`}</span>
          }
        />
      }
    >
      {children}
    </StyledSelect>
  );
};

export default SelectDropDown;
