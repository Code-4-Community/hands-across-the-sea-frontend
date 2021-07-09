import React from 'react';
import { Select } from 'antd';

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
  return Object.entries(e).map(([key, value]) => (
    <Select value={key} key={key}>
      {value}
    </Select>
  ));
};
