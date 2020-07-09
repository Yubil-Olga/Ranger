import Data from './data'

describe('Initial values and coords for double slider', () => {
  let settings = {
    type: 2,
    direction: null,
    tagmark: true,
    prefix: null,
    start: 0,
    end: 200,
    step: 10
  }
  let data = new Data(1, settings)
  test('Calculate coord', () => {
    expect(data.value).toBe("100")
    expect(data.coord).toBe(50)
  })
})