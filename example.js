
'use strict';

const logBuffer = require('./index');

// Set capacity to 100 entries
const capacity = 2;

// Set autoflush (optional)
const autoflush = { 
    enabled: true, 
    callback: (data) => {
        console.log( `autoflush'd: ${ JSON.stringify(data, null, 4) }` );
    },
    interval: 15000
}

let res;

// Create logBuffer object
let lb = new logBuffer(capacity, { autoflush: autoflush });

// Add log entry
res = lb.add( {message: 'Logged!', ts: new Date().getTime()} );
console.log(res);

setTimeout( () => {
    // Add another log entry
    res = lb.add( {message: 'Logged again!', ts: new Date().getTime()} );
    console.log(res);
}, 2500);
