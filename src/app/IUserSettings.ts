export default interface IUserSettings {
  type?: string,
  direction?: string,
  start?: number,
  end?: number,
  step?: number,
  scaleStep?: number,
  color?: string,
  hasTagmark?: boolean,
  values?: Array<string>,
  prefix?: string
}