export default interface IOptions {
  type: number,
  direction: string,
  start?: number,
  end?: number,
  step?: number,
  scalestep?: number,
  values?: Array<string>,
  prefix: string,
  hasTagmark: boolean,
  color?: string
}
