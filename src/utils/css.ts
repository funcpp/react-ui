export type CSSLength = number | string;

export const cssLength = (cssLength?: CSSLength | null | undefined): string => {
  if (typeof cssLength === 'number') {
    return `${cssLength}px`;
  }
  return cssLength || '0px';
};

export const cssAdd = (a: CSSLength, b: CSSLength): CSSLength => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  return `calc(${cssLength(a)} + ${cssLength(b)})`;
};

export const cssSub = (a: CSSLength, b: CSSLength): CSSLength => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return `calc(${cssLength(a)} - ${cssLength(b)})`;
};

export const cssMul = (a: CSSLength, b: number): CSSLength => {
  if (typeof a === 'number') {
    return a * b;
  }
  return `calc(${cssLength(a)} * ${b})`;
};

export const cssDiv = (a: CSSLength, b: number): CSSLength => {
  if (typeof a === 'number') {
    return a / b;
  }
  return `calc(${cssLength(a)} / ${b})`;
};
