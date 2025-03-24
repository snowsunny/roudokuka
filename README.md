# roudokuka
roudokuka is simple web reader, it's working with browser feature only.<br>
"Roudokuka" == "朗読家" == "Reader"

## Example
You can try examples easily in your browser. click ↓ link.<br>
https://snowsunny.github.io/roudokuka

## How to use roudokuka?
You must load roudokuka somehow. if it's done, roudokuka is ready to use!!

### jsDelivr CDN
[![](https://data.jsdelivr.com/v1/package/npm/roudokuka/badge)](https://www.jsdelivr.com/package/npm/roudokuka)
Add ↓ tag to somewhere.
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/roudokuka/docs/roudokuka.min.js"></script>
```

### npm
roudokuka is published on npm → https://www.npmjs.com/package/roudokuka<br>
install with npm or yarn or something, and add line like this ↓ to somewhere.
```js
import Roudokuka from 'roudokuka'
```

### Simple usage
```js
let roudokuka = new Roudokuka(['1, 2, 3', '4, 5, 6'])
roudokuka.start()
```
If you want try more examples, check ↓ page.<br>
https://snowsunny.github.io/roudokuka

# Documentation
## Classes
### Roudokuka
This is main class of roudokuka.
#### Methods

#### constructor(linesInfoArray, userOptions:Object)
Create roudokuka object.

> __linesInfoArray__<br>
> Type: Array<br>
> linesInfoArray is must contain string or object.

```js
// string only
let linesInfo = ['1, 2, 3', '4, 5, 6']

// string with line object.
// line object is can set SpeechSynthesisUtterance's properties and events. more help → https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
let linesInfo = ['1, 2, 3', '4, 5, 6', {
  text: '7, 8, 9',
  pitch: '1.8',
  rate: '1.5',
  onend: (e) => {
    console.log(e)
  }
}]
```
> __userOptions__<br>
> Type: Object<br>
> userOptions is overwrite defaultOptions property, It's using for global utterance options and roudokuka's events.
```js
defaultOptions = {
  lang: "",
  onboundary: null,
  onend: null,
  onerror: null,
  onmark: null,
  onpause: null, // still buggy any browser
  onresume: null, // still buggy any browser
  onstart: null,
  pitch: 1,
  rate: 1,
  voice: null,
  volume: 1,
  onLibrettoEnd: undefined
}
```

#### start(lineIndex)
start reading with roudokuka.
> __lineIndex__<br>
> Type: int (default = 0)<br>
> If you want start with not first line, you can set Index number of lines.

#### stop()
Stop reading.

#### onReady() - Return: Promise
If you want change voice, this method is wait on voices loading. this method use with voices property.
```js
// Example
let roudokuka = new Roudokuka(['1, 2, 3', '4, 5, 6'])
roudokuka.onReady().then(() => {
  console.log(roudokuka.voices)
})
```

#### Events
roudokuka is can use with SpeechSynthesisUtterance's events. more help → https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
```js
let options = {
  onend: (speechSynthesisEvent, lineObject) => {
    // roudokuka is return "speechSynthesisEvent" and "lineObject" to callback of onend event.
    console.log(speechSynthesisEvent, lineObject)
  }
}
let roudokuka = new Roudokuka(['1, 2, 3', '4, 5, 6'], options)
roudokuka.start()
```

#### onLibrettoEnd
If read all lines in libretto property, this event is triggered.
```js
// loop with onLibrettoEnd event
let loopCount = 0
let roudokuka = new Roudokuka(['1, 2, 3', '4, 5, 6'], {
  onLibrettoEnd: () => {
    if(loopCount++ < 2) {
      console.log(`Libretto is end. loop: ${loopCount}`)
      roudokuka.start()
    }
  }
})
roudokuka.start()
```

<!--
#### Properties

#### libretto : Libretto
This property have libretto object, create from Libretto class.

#### currentLine : object (default = undefined)
This property have current reading line object.

#### defaultOptions : object
This property using for default options of roudokuka.

#### options : object
This property is merged options of default options to user options.

#### voices : Array (default = [])
This property have usable voices on working browser. this property is available on after use onReady method.
-->
