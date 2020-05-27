import './index.css'
import './app/app'
import $ from 'jquery'
import IUserSettings from './app/IUserSettings'

const settings = [
    {type: 'double', start: -80, end: 40, step: 20, scalestep: 20},
    {start: -80, end: 40, prefix: "$"},
    {values: ['jen', 'feb', 'march', 'apr', 'may'], color: 'linear-gradient(yellow 0, red 100%)'},
    {direction: 'vertical', tagmark: false}
]
const formSettings = []
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
        this.typeInput = this.createSelect(['single', 'double'])
        this.directionInput = this.createSelect(['horizontal', 'vertical'])
        this.startInput = this.createInput('number', 'from')
        this.endInput = this.createInput('number', 'to')
        this.stepInput = this.createInput('number', 'step')
        this.scalestepInput = this.createInput('number', 'step of the scale')
        this.tagmarkInput = this.createInput('checkbox', 'tagmark')
        this.valueInput = this.createInput('text', "A, B, C")
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
        
        const tagmarkLabel = document.createElement('label')
        tagmarkLabel.textContent = 'Show tagmark'
        tagmarkLabel.append(this.tagmarkInput)
        this.createLabel('Color', this.colorInput)
        this.createLabel('Prefix', this.prefixInput)
        this.createLabel('Type', this.typeInput)
        this.createLabel('direction', this.directionInput)
        this.createLabel('Min value', this.startInput)
        this.createLabel('Max value', this.endInput)
        this.createLabel('Step of slider', this.stepInput)
        this.createLabel('Scale step', this.scalestepInput)
        this.createLabel('Show tagmark', this.tagmarkInput)
        this.createLabel('String values', this.valueInput)
        this.form.append(this.btn)
        
        return this
    }
    createLabel(name: string, input: HTMLElement) {
        const label = document.createElement('label')
        label.textContent = name
        label.append(input)
        this.form.append(label)
    }
    createInput(type: string, name: string) {
        const input = document.createElement('input')
        input.type = type
        input.placeholder = name
        return input
    }
    createButton(name: string) {
        const el = document.createElement('button')
        el.className = name
        el.textContent = "Применить"
        return el
    }
    createSelect(name: Array<string>) {
        const select = document.createElement('select')
        for (let i=0; i<name.length; i++) {
            const option = document.createElement('option')
            option.value = name[i]
            option.textContent = name[i]
            select.append(option)
        }
        return select
    }
}
window.onload = function() {
    settings.forEach((el, index) => {
        const container = document.createElement('div')
        container.id = `container-${index}`
        document.querySelector('.wrapper').append(container)
        $(`#container-${index}`).perfectSlider(el)
        checkDirection(el.direction, container)
        const formControll = new FormControll(index).createForm(el) 
        const resultInput = document.querySelector(`#container-${index} .slider input`)
        formControll.form.append(resultInput) 
        formSettings.push(formControll)
        container.prepend(formControll.form)
    })
}

document.addEventListener('click', draw)

function draw() {
    if ((<HTMLLIElement>event.target).tagName === 'BUTTON') {
        event.preventDefault()
        const index = parseInt((<HTMLButtonElement>event.target).className.split('-')[1])
        changeSettings(index)
        document.querySelector(`#container-${index} .slider`).remove()
        checkDirection(settings[index].direction, document.querySelector(`#container-${index}`))
        $(`#container-${index}`).perfectSlider(settings[index])
        document.querySelector(`#container-${index} form`).lastElementChild.remove()
        const resultInput = document.querySelector(`#container-${index} .slider input`)
        document.querySelector(`#container-${index} form`).append(resultInput) 
    } 
}
function changeSettings(index: number) {
    settings[index].values = formSettings[index].valueInput.value.split(',')
    if (settings[index].values.length > 1) {
        formSettings[index].startInput.value = null;
        formSettings[index].endInput.value = null;
        formSettings[index].stepInput.value = null;
        formSettings[index].scalestepInput.value = null; 
    }
    settings[index].color = formSettings[index].colorInput.value
    settings[index].prefix = formSettings[index].prefixInput.value
    settings[index].type = formSettings[index].typeInput.value
    settings[index].direction = formSettings[index].directionInput.value
    settings[index].start = Number(formSettings[index].startInput.value)
    settings[index].end = Number(formSettings[index].endInput.value)
    settings[index].step = Number(formSettings[index].stepInput.value)
    settings[index].scalestep = Number(formSettings[index].scalestepInput.value)
    settings[index].tagmark = formSettings[index].tagmarkInput.checked
}
function checkDirection(direction: string, div: HTMLElement) {
    if (direction === 'vertical') {
        div.className = 'row'
    }
    else {
        div.className = ''
    }
}

