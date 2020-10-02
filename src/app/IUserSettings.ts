export default interface IUserSettings {
  type?: string,
  direction?: string,
  start?: number,
  end?: number,
  step?: number,
  scalestep?: number,
  color?: string,
  hasTagmark?: boolean,
  values?: Array<string>,
  prefix?: string
}