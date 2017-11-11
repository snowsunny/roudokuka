# roudokuka
roudokuka is simple web reader, it's working with browser feature only.<br>
"Roudokuka" == "朗読家" == "Reader"

## Example
You can try examples easily in your browser. click ↓ link.<br>
https://snowsunny.github.io/roudokuka

## How to use roudokuka?
You must load roudokuka somehow. if it's done, roudokuka is ready to use!!

### jsDelivr CDN
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