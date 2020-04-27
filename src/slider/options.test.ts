import Options from './options'

let smth = []
smth[0] = {
    options : {start: -25, end: 100, step: 25, scalestep: 10, prefix: "%"},
    result : {type: 1, start: -25, end: 100, step: 25, scalestep: 10, tagmark: true, prefix: "%"},
    settings() {
        return new Options(this.options).create()
    }   
}

smth[1] = {
    options : {start: 250, end: 100, step: 30, scalestep: 1000},
    result : {type: 1, start: 0, end: 100, step: 1, tagmark: true},  
    settings() {
        return new Options(this.options).create()
    }
}

smth[2] = {
    options : {type: 'double', start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical'},
    result : {type: 2, direction: 'vertical', values: ["one", "two", "three"], tagmark: true},  
    settings() {
        return new Options(this.options).create()
    }
}

smth[3] = {
    options : {type: 'double',start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical', tagmark: false, color: "red"},
    result : {type: 2, direction: 'vertical', values: ["one", "two", "three"], color: "red", tagmark: false},  
    settings() {
        return new Options(this.options).create()
    }
}

test('Set correct options', ( ) => {
    expect(smth[0].settings).toBeDefined()
    expect(smth[0].settings()).toMatchObject(smth[0].result)

    expect(smth[1].settings).toBeDefined()
    expect(smth[1].settings()).toMatchObject(smth[1].result)

    expect(smth[2].settings).toBeDefined()
    expect(smth[2].settings()).toMatchObject(smth[2].result)

    expect(smth[3].settings).toBeDefined()
    expect(smth[3].settings()).toMatchObject(smth[3].result)
})


