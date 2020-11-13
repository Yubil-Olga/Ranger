export interface IOptions {
  isRange?: boolean,
  isVertical?: boolean,
  start?: number,
  end?: number,
  step?: number,
  scaleStep?: number,
  color?: string,
  hasTagmark?: boolean,
  values?: Array<string>,
  prefix?: string,
  from?: number | string,
  to?: number | string
}