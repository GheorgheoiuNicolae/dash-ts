// import * as color from 'color';

export default function normalizeColors(object: {}): {} {
  return Object.keys(object)
    .reduce((output, key) => ({
      // ...output, [key]: color(object[key]).hex(),
    }), {}); // tslint:disable-line
}
