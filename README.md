# PerfectSlider

easy, flexible and responsive range slider

## Demo
[Demo page](https://www.google.com)

## Usage


### Initialisation
To initialise the slider, call perfectSlider on the element:
```javascript
$("#example_id").perfectSlider()
```

### Settings
| Option        | Defaults      | Type   | Description                                                                     |
| ------------- |:-------------:|:------:|---------------------------------------------------------------------------------|
| direction     | horizintal    | string | Choose slider direction, could be horizontal or vertical                        |
| type          | single        | string | Choose slider type, could be single - for one handle, or double for two handles |
| start         | 0             | number | Set slider minimum value
| end           | 100           | number | Set slider maximum value
| step          | 1             | number | Set sliders step
| scalestep     | -             | number | Creates scale of the slider, set step of scale
| prefix        | -             | string | Set prefix for values
| color         | #53b6a8       | string | Set actve color, could be gradient
| tagmark       | true          | boolean| Set tagmark
| values        | []            | array  | Set your own array of possible slider values. They should be strings.   