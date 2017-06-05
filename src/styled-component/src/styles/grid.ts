interface Variables {
  screenXS: number;
  screenMS: number;
  screenSM: number;
  screenMD: number;
  screenLG: number;
  gridColumns: number;
  gridGutterWidth: number;
}

interface Sizes {
  containerMS: number;
  containerSM: number;
  containerMD: number;
  containerLG: number;
  screenXSMin: number;
  screenXSMax: number;
  screenMSMin: number;
  screenMSMax: number;
  screenSMMin: number;
  screenSMMax: number;
  screenMDMin: number;
  screenMDMax: number;
  screenLGMin: number;
}

const variables: Variables = {
  screenXS: 480,
  screenMS: 480,
  screenSM: 768,
  screenMD: 992,
  screenLG: 1200,
  gridColumns: 12,
  gridGutterWidth: 30,
};

const sizes: Sizes = {
  screenXSMin: variables.screenXS,
  screenMSMin: variables.screenMS,
  screenSMMin: variables.screenSM,
  screenMDMin: variables.screenMD,
  screenLGMin: variables.screenLG,
  screenXSMax: variables.screenMS - 1,
  screenMSMax: variables.screenSM - 1,
  screenSMMax: variables.screenMD - 1,
  screenMDMax: variables.screenLG - 1,
  containerMS: 480 + variables.gridGutterWidth,
  containerSM: 720 + variables.gridGutterWidth,
  containerMD: 940 + variables.gridGutterWidth,
  containerLG: 1140 + variables.gridGutterWidth,
};

export const mediaQueryXS = `@media (max-width: ${sizes.screenXSMax}px)`;
export const mediaQueryMS = `@media (min-width: ${sizes.screenMSMin}px) and (max-width: ${sizes.screenMSMax}px)`;
export const mediaQueryMaxMS = `@media (max-width: ${sizes.screenMSMax}px)`;
export const mediaQuerySM = `@media (min-width: ${sizes.screenSMMin}px) and (max-width: ${sizes.screenSMMax}px)`;
export const mediaQueryMaxSM = `@media (max-width: ${sizes.screenSMMax}px)`;
export const mediaQueryMD = `@media (min-width: ${sizes.screenMDMin}px) and (max-width: ${sizes.screenMDMax}px)`;
export const mediaQueryMaxMD = `@media (max-width: ${sizes.screenMDMax}px)`;
export const mediaQueryLG = `@media (min-width: ${sizes.screenLGMin}px)`;

export const container: {} = {
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingLeft: Math.floor(variables.gridGutterWidth / 2),
  paddingRight: Math.ceil(variables.gridGutterWidth / 2),
  [mediaQuerySM]: {
    width: sizes.containerSM,
  },
  [mediaQueryMD]: {
    width: sizes.containerMD,
  },
  [mediaQueryLG]: {
    width: sizes.containerLG,
  },
};

export const row: {} = {
  marginLeft: Math.ceil(variables.gridGutterWidth / -2),
  marginRight: Math.floor(variables.gridGutterWidth / -2),
};

export const column: {} = {
  position: 'relative',
  minHeight: '1px',
  paddingLeft: Math.ceil(variables.gridGutterWidth / 2),
  paddingRight: Math.floor(variables.gridGutterWidth / 2),
  float: 'left',
  [mediaQueryMS]: {
    float: 'left',
  },
  [mediaQuerySM]: {
    float: 'left',
  },
  [mediaQueryMD]: {
    float: 'left',
  },
  [mediaQueryLG]: {
    float: 'left',
  },
};

export interface Widths {
  xs: {};
  ms: {};
  sm: {};
  md: {};
  lg: {};
};

function createColumnWidth(): Widths {
  const xs = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    width: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
  }));
  const ms = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMS]: {
      width: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const sm = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQuerySM]: {
      width: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const md = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMD]: {
      width: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const lg = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryLG]: {
      width: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));

  return { xs, ms, sm, md, lg };
}
export const columnWidth = createColumnWidth();

export interface MarginsLeft {
  xs: {};
  ms: {};
  sm: {};
  md: {};
  lg: {};
};

function createColumnOffset(): MarginsLeft {
  const xs = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    marginLeft: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
  }));
  const ms = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMS]: {
      marginLeft: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const sm = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQuerySM]: {
      marginLeft: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const md = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMD]: {
      marginLeft: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const lg = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryLG]: {
      marginLeft: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));

  return { xs, ms, sm, md, lg };
}
export const columnOffset = createColumnOffset();

export interface PositionsRight {
  xs: {};
  ms: {};
  sm: {};
  md: {};
  lg: {};
}

function createColumnPull(): PositionsRight {
  const xs = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    right: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
  }));
  const ms = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMS]: {
      right: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const sm = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQuerySM]: {
      right: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const md = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMD]: {
      right: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const lg = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryLG]: {
      right: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));

  return { xs, ms, sm, md, lg };
}
export const columnPull = createColumnPull();

export interface PositionsLeft {
  xs: {};
  ms: {};
  sm: {};
  md: {};
  lg: {};
}

function createColumnPush(): PositionsLeft {
  const xs = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    left: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
  }));
  const ms = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMS]: {
      left: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const sm = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQuerySM]: {
      left: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const md = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryMD]: {
      left: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));
  const lg = Array(variables.gridColumns + 1).fill(null).map((v, i) => ({
    [mediaQueryLG]: {
      left: `${(i / variables.gridColumns * 100).toFixed(5)}%`,
    },
  }));

  return { xs, ms, sm, md, lg };
}
export const columnPush = createColumnPush();

export interface HiddenColumns {
  xs: {};
  ms: {};
  sm: {};
  md: {};
  lg: {};
}

export const columnHidden: HiddenColumns = {
  xs: {
    [mediaQueryXS]: {
      display: 'none',
    },
  },
  ms: {
    [mediaQueryMS]: {
      display: 'none',
    },
  },
  sm: {
    [mediaQuerySM]: {
      display: 'none',
    },
  },
  md: {
    [mediaQueryMD]: {
      display: 'none',
    },
  },
  lg: {
    [mediaQueryLG]: {
      display: 'none',
    },
  },
};

export const clearfix: {} = {
  clear: 'both',
};
