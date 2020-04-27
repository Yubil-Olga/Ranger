export default class Options {
    private type: number
    private direction: string
    private prefix: string
    private color: string
    private tagmark: boolean
    private settings: any

    constructor(options: any) {
        this.settings = options
        this.type = options.type === 'double' ? 2 : 1
        this.direction = options.direction === 'vertical' ? 'vertical' : null
        this.prefix = typeof options.prefix === 'string' ? options.prefix : null
        this.color = typeof options.color === 'string' ? options.color : null
        this.tagmark = options.tagmark === false ? false : true
    }
    create() {
        let values = []
        if (this.settings.values && Array.isArray(this.settings.values)) {
            values = this.settings.values.filter((el:any) => typeof el === 'string')
        }
        if (values.length > 1) {
            return new ValueSlider(values, this.settings)
        }
        else {
            return new NumberSlider(this.settings)
        }
    }
}
class NumberSlider extends Options {
    private start: number
    private end: number
    private step: number
    private scalestep: number
    constructor(options: any) {
        super(options)
        if (typeof options.start !== 'number' || typeof options.end !== 'number' || options.start > options.end) {
            this.start = 0
            this.end = 100
        }
        else {
            this.start = options.start
            this.end = options.end
        }
        this.step = this.checkStep(options)
        this.scalestep = this.checkScalestep(options)
    }
    checkStep(options: any) {
        // if (typeof options.step !== 'number'|| options.step < 1 || (this.end - this.start)%options.step > 0) {
        //     return 1
        // }
        if (typeof options.step !== 'number'|| options.step < 1) {
            return 1
        }
        if (options.step > Math.abs(options.end - options.start)) {
            return Math.abs(options.end - options.start)
        }
        else {
            return options.step
        }
    }
    checkScalestep(options: any) {
        if (typeof options.scalestep === 'number' && options.scalestep > 1 && options.scalestep < (this.end - this.start)) {
            return options.scalestep
        }
        return null
    }
}
class ValueSlider extends Options{
    private values: any
    constructor(values: any, options: any) {
        super(options)
        this.values = values
    }
}

    

