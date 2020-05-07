export default interface userSettings {
    type?: string,
    direction?: string, 
    start?: number,
    end?: number,
    step?: number,
    scalestep?: number, 
    color?: string,
    tagmark?: boolean,
    values?: Array<string>,
    prefix?: string
}