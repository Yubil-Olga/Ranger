import './index.css'
import './app/app'
import $ from 'jquery'
import IUserSettings from './app/IUserSettings'

document.addEventListener('dragstart', () => {
    return false
})
let settings = [
    {type: 'double', start: -80, end: 40, step: 20, scalestep: 20},
    {start: -80, end: 40, prefix: "$"},
    {values: ['jen', 'feb', 'march', 'apr', 'may'], color: "linear-gradient(yellow 0, red 100%)"},
    {direction: 'vertical', tagmark: false}
]
let formSettings = []
class FormControll {
    form: HTMLElement
    colorInput: HTMLInputElement
    prefixInput: HTMLInputElement
    typeInput: HTMLSelectElement
    directionInput: HTMLSelectElement
    startInput: HTMLInputElement
    endInput: HTMLInputElement
    stepInput: HTMLInputElement
    scalestepInput: HTMLInputElement
    tagmarkInput: HTMLInputElement
    valueInput: HTMLInputElement
    btn: HTMLButtonElement
    constructor(index: number) {
        this.form = document.createElement('form')
        this.colorInput = this.createInput('text', 'color')
        this.prefixInput = this.createInput('text', 'prefix')
        this.typeInput = this.createSelect(['single', "double"])
        this.directionInput = this.createSelect(['horizontal', 'vertical'])
        this.startInput = this.createInput('number', 'from')
        this.endInput = this.createInput('number', 'to')
        this.stepInput = this.createInput('number', 'step')
        this.scalestepInput = this.createInput('number', 'step of the scale')
        this.tagmarkInput = this.createInput('checkbox', 'tagmark')
        this.valueInput = this.createInput('text', "String values")
        this.btn = this.createButton(`apply-${index}`)
    }
    createForm(el: IUserSettings) {
        this.colorInput.value = el.color !== undefined? el.color : '#53b6a8'
        this.directionInput.value = el.direction? el.direction : 'horizontal'
        this.typeInput.value = el.type? el.type : 'single'
        this.prefixInput.value = el.prefix? el.prefix : null
        this.startInput.value = el.start? el.start.toString() : null
        this.endInput.value = el.end? el.end.toString() : null
        this.stepInput.value = el.step? el.step.toString() : null
        this.scalestepInput.value = el.scalestep? el.scalestep.toString() : null
        this.tagmarkInput.checked = (el.tagmark === false) ? false : true
        this.valueInput.value = el.values? el.values.join(',') : null
        
        let tagmarkLabel = document.createElement('label')
        tagmarkLabel.textContent = 'Show tagmark'
        tagmarkLabel.append(this.tagmarkInput)
        
        this.form.append(this.colorInput, this.prefixInput, this.typeInput, this.directionInput, 
                         this.startInput, this.endInput, this.stepInput, this.scalestepInput, tagmarkLabel,
                        this.valueInput, this.btn)
        
        return this
    }
    createInput(type: string, name: string) {
        let input = document.createElement('input')
        input.type = type
        input.placeholder = name
        return input
    }
    createButton(name: string) {
        let el = document.createElement('button')
        el.className = name
        el.textContent = "Применить"
        return el
    }
    createSelect(name: Array<string>) {
        let select = document.createElement('select')
        for (let i=0; i<name.length; i++) {
            let option = document.createElement('option')
            option.value = name[i]
            option.textContent = name[i]
            select.append(option)
        }
        return select
    }
}
settings.forEach((el, index) => {
    let container = document.createElement('div')
    container.className = `container-${index}`
    document.querySelector('.wrapper').append(container)
    $(`.container-${index}`).perfectSlider(el)
    let formControll = new FormControll(index).createForm(el) 
    let resultInput = document.querySelector(`.container-${index} .slider input`)
    formControll.form.append(resultInput)
    // console.log(formControll.form)   
    formSettings.push(formControll)
    container.prepend(formControll.form)
})

document.addEventListener('click', draw)

function draw() {
    if ((<HTMLLIElement>event.target).tagName === 'BUTTON') {
        event.preventDefault()
        let index = parseInt((<HTMLButtonElement>event.target).className.split('-')[1])
        changeSettings(index)
        document.querySelector(`.container-${index} .slider`).remove()
        $(`.container-${index}`).perfectSlider(settings[index])
    } 
}
function changeSettings(index: number) {
    settings[index].color = formSettings[index].colorInput.value
    settings[index].prefix = formSettings[index].prefixInput.value
    settings[index].type = formSettings[index].typeInput.value
    settings[index].direction = formSettings[index].directionInput.value
    settings[index].start = Number(formSettings[index].startInput.value)
    settings[index].end = Number(formSettings[index].endInput.value)
    settings[index].step = Number(formSettings[index].stepInput.value)
    settings[index].scalestep = Number(formSettings[index].scalestepInput.value)
    settings[index].tagmark = formSettings[index].tagmarkInput.checked
    settings[index].values = formSettings[index].valueInput.value.split(',')
}
 