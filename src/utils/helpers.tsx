import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const toTitleCase = (str: string): string => {
  let ret = str.replace(/_/g, ' ');
  ret = ret.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  return ret;
};

export const getOptionsFromEnum = (e: {
  [s: number]: string;
}): JSX.Element[] => {
  return Object.keys(e).map((enumKey: string) => (
    <Option value={enumKey} key={enumKey}>
      {toTitleCase(enumKey)}
    </Option>
  ));
};
