# HannoTestORE

Prototype for Hanno.


## Prerequisites

* nodejs v18.16.1
* npm 9.6.7

```javascript
npm i
npm run fetch
```

This can take awhile as the file fetches all of the ore data we need from the eve api.

After you get the message ``Write to JSON completed! :D``

## General app

do ``node hannoPriceCalc.js``

7/26/2023
Currently only has a sample drekavac blueprint array. If you want to change values, you'll
need to go to ``hannoParse.js`` and then go to ``const drekavac`` and change the values accordingly.
