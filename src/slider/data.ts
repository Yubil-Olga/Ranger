export default class Data {
    private value: any
    private coord: number
    constructor(i: number, options: any) {
        if (options.values) {
            this.value = options.values[i].toString(),
            this.coord = i*100/(options.values.length - 1)
        }
        else {
            this.value = options.start + i*options.step,
            this.coord = i*options.step*100/(options.end - options.start) 
        }
    }
}