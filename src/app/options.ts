import IUserSettings from './IUserSettings'

interface IOptions {
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

class Options implements IOptions  {
    private _type: number
    private _direction: string
    private _prefix: string
    private _color: string
    private _tagmark: boolean

    constructor(options: IUserSettings) {
        this._type = options.type === 'double' ? 2 : 1
        this._direction = options.direction === 'vertical' ? 'vertical' : null
        this._prefix = typeof options.prefix === 'string' ? options.prefix : null
        this._color = typeof options.color === 'string' ? this.colorValidation(options.color) : null
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
    colorValidation(color: string) {
        const div = document.createElement('div')
        div.style.color = color
        if (div.style.color === '') {
            return null
        }
        else {
            return color
        }
    }
}
class CreateOptions {
    private settings: IUserSettings
    constructor(settings: IUserSettings) {
        this.settings = settings
    }
    create() {
        let values = []
        if (this.settings.values && Array.isArray(this.settings.values)) {
            values = this.settings.values.filter((el:any) => typeof el === 'string')
        }
        if (values.length > 1) {
            return new ValueSliderOptions(values, this.settings)
        }
        else {
            return new NumberSliderOptions(this.settings)
        }
    }
}
class NumberSliderOptions extends Options {
    private _start: number
    private _end: number
    private _step: number
    private _scalestep: number
    
    constructor(options: IUserSettings) {
        super(options)
        if (this.userSettingsInvalid(options)) {
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
    userSettingsInvalid(options: IUserSettings) {
        return (typeof options.start !== 'number' || typeof options.end !== 'number' || options.start >= options.end)
    }
    checkStep(options: IUserSettings) {
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
    checkScalestep(options: IUserSettings) {
        if (this.scalestepSettingsValid(options)) {
            return options.scalestep
        }
        return (this.end - this.start)
    }
    scalestepSettingsValid(options: IUserSettings) {
        return (typeof options.scalestep === 'number' && options.scalestep > 1 && options.scalestep < (this.end - this.start))
    }
}
class ValueSliderOptions extends Options{
    private _values: Array<string>
    constructor(values: Array<string>, options: IUserSettings) {
        super(options)
        this._values = values
    }
    get values() {
        return this._values
    }
}
export {
    IOptions,
    Options,
    CreateOptions
}

    
