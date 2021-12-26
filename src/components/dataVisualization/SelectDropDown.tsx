import { Empty } from 'antd';
import { DataManagerOptions } from '../../containers/dataVisualization/types';
import React from 'react';
import { StyledSelect } from './index';

interface SelectDropDownProps {
  readonly selectedButton: string;
  readonly setSelectedDropDownValue: (dv: any) => void;
  readonly placeholder?: string;
  readonly noDataText?: string;
  readonly loading?: boolean;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  selectedButton,
  setSelectedDropDownValue,
  placeholder,
  noDataText,
  loading,
  children,
}) => {
  return (
    <StyledSelect
      placeholder={placeholder || 'Search'}
      loading={loading || false}
      showSearch
      allowClear
      onChange={(value) => setSelectedDropDownValue(value)}
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
