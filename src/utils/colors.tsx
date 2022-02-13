import { Countries } from './countries';

export const PRIMARY = '#3BD1BC';
export const SECONDARY = '#F88812';
export const BACKGROUND = '#FFFFFF';
export const LINK = '#1890ff';
export const HEADER_TEXT = '#FFFFFF';

interface HexColorPalette {
  readonly primary: string;
  readonly primaryDark: string;
  readonly secondary: string;
  readonly tertiary: string;
  readonly background: string;
  readonly headerText: string;
  readonly disabled: string;
  readonly darkText: string;
  readonly lightText: string;
  readonly subtext: string;
}

export default function getColorPalette(country?: string): HexColorPalette {
  switch (country) {
    case Countries.UNITED_STATES:
      return {
        primary: '#3BD1BC',
        primaryDark: '#299283',
        secondary: '#F88812',
        tertiary: '#E3E5E5',
        background: '#FFFFFF',
        headerText: '#FFFFFF',
        disabled: '#EB5757',
        darkText: '#333',
        lightText: '#FFF',
        subtext: '#767a7d',
      };
    default:
      return {
        primary: '#3BD1BC',
        primaryDark: '#299283',
        secondary: '#F88812',
        tertiary: '#E3E5E5',
        background: '#FFFFFF',
        headerText: '#FFFFFF',
        disabled: '#EB5757',
        darkText: '#333',
        lightText: '#FFF',
        subtext: '#767a7d',
      };
  }
}
