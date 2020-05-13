import UserSettings from './userSettings'

export interface IOptions {
    type: number,
    direction: string,
    start?: number,
    end?: number,
    step?: number,
    scalestep?: number,
    values?: Array<string>,
    prefix: string,
    tagmark: boolean,
    color?: string
}

export class Options implements IOptions  {
    private _type: number
    private _direction: string
    private _prefix: string
    private _color: string
    private _tagmark: boolean
    private settings: UserSettings

    constructor(options: UserSettings) {
        this.settings = options
        this._type = options.type === 'double' ? 2 : 1
        this._direction = options.direction === 'vertical' ? 'vertical' : null
        this._prefix = typeof options.prefix === 'string' ? options.prefix : null
        this._color = typeof options.color === 'string' ? options.color : null
        this._tagmark = options.tagmark === false ? false : true
    }
    get type() {
        return this._type
    }
    get direction() {
        return this._direction
    }
    get prefix() {
        return this._prefix
    }
    get tagmark() {
        return this._tagmark
    }
    get color() {
        return this._color
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
    private _start: number
    private _end: number
    private _step: number
    private _scalestep: number
    constructor(options: UserSettings) {
        super(options)
        if (typeof options.start !== 'number' || typeof options.end !== 'number' || options.start > options.end) {
            this._start = 0
            this._end = 100
        }
        else {
            this._start = options.start
            this._end = options.end
        }
        this._step = this.checkStep(options)
        this._scalestep = this.checkScalestep(options)
    }
    get start() {
        return this._start
    }
    get end() {
        return this._end
    }
    get step() {
        return this._step
    }
    get scalestep() {
        return this._scalestep
    }
    checkStep(options: UserSettings) {
        if (typeof options.step !== 'number'|| options.step < 1) {
            return 1
        }
        if (options.step > Math.abs(options.end - options.start)) {
            return Math.abs(this.end - this.start)
        }
        else {
            return options.step
        }
    }
    checkScalestep(options: UserSettings) {
        if (typeof options.scalestep === 'number' && options.scalestep > 1 && options.scalestep < (this.end - this.start)) {
            return options.scalestep
        }
        return (this.end - this.start)
    }
}
class ValueSlider extends Options{
    private _values: Array<string>
    constructor(values: Array<string>, options: UserSettings) {
        super(options)
        this._values = values
    }
    get values() {
        return this._values
    }
}

    

