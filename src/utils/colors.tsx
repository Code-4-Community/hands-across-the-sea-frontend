import { Countries } from './countries';

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
    // example of how to create a country specific country palette
    case Countries.UNITED_STATES:
      return {
        primary: '#3BD1BC', // these are the same as in the default palette, but you could
        primaryDark: '#299283', // change them to red white and blue if you wanted
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
