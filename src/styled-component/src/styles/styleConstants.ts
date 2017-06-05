// import * as color from 'color';
import { Colors, MediaQueries, Sizes, StyleConstants, Transitions } from '../index';
import {
  mediaQueryLG,
  mediaQueryMaxMD,
  mediaQueryMaxMS,
  mediaQueryMaxSM,
  mediaQueryMD,
  mediaQueryMS,
  mediaQuerySM,
  mediaQueryXS,
} from './grid';
import normalizeColors from './normalizeColors';

const colors: Colors = <Colors> normalizeColors({
  alto: '#DFDFDF',
  background: '#ffffff',
  bahamaBlue: '#17587D',
  baliHai: '#819CB1',
  baseGreen: '#53d228',
  darkOrange: '#D17832',
  darkRed: '#860C00',
  dimGray: '#696969',
  dodgerBlue: '#139DF2',
  dustyGray: '#9C9C9C',
  ebonyClay: '#212B33',
  error: '#E6402E',
  flamingo: '#E24F61',
  gainsboro: '#dcdcdc',
  gray20: '#333333',
  gray30: '#4D4D4D',
  gray40: '#656565',
  gray48: '#7A7A7A',
  gray50: '#808080',
  gray53: '#878787',
  gray60: '#9B9B9B',
  gray67: '#AAAAAA',
  gray70: '#B3B3B3',
  gray90: '#E5E5E5',
  gray95: '#F4F4F4',
  greenDark: '#2E5C0F',
  greenDarker: '#16733D',
  harleyDavidsonOrange: '#C32515',
  inputBorderColor: '#00adef',
});

const mediaQueries: MediaQueries = {
  max479: mediaQueryXS,
  min480max767: mediaQueryMS,
  max767: mediaQueryMaxMS,
  min768max991: mediaQuerySM,
  max991: mediaQueryMaxSM,
  min992max1199: mediaQueryMD,
  max1199: mediaQueryMaxMD,
  min1200: mediaQueryLG,
  retina: '@media (-webkit-min-device-pixel-ratio: 2)',
  webkit: '@media (-webkit-min-device-pixel-ratio: 0)',
};

const sizes: Sizes = {
  checkbox: '16px',
  container: '1024px',
  inputFontSize: '16px',
  inputHeight: '40px',
  large: '20px',
  medium: '15px',
  small: '10px',
  tiny: '5px',
};

const transitions: Transitions = {
  linear: 'all .1s linear',
  tile: 'all .1s ease-in-out',
};

const styleConstants: StyleConstants = {
  colors,
  mediaQueries,
  sizes,
  transitions,
};

export default styleConstants;
