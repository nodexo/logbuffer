
logbuffer
=========

Specialized [circular buffer](https://en.wikipedia.org/wiki/Circular_buffer) for Node.js high performance logging: 
It buffers log entries in memory and flushes the data to a callback function later.
Triggered by size threshold or time interval.

Installation
------------

    npm install logbuffer

Usage
-----

Example:

```javascript
const logBuffer = require('logbuffer');

// Set capacity to 100 entries
const capacity = 100;

// Set autoflush (optional)
const autoflush = { 
    enabled: true, 
    callback: (data) => {
        console.log( `autoflush'd: ${ JSON.stringify(data, null, 4) }` );
    },
    interval: 15000
}

// Create logBuffer object
let lb = new logBuffer(capacity, { autoflush: autoflush });

// Add log entry
lb.add( {message: 'Logged!', ts: new Date().getTime()} );

setTimeout( () => {
    // Add another log entry
    lb.add( {message: 'Logged again!', ts: new Date().getTime()} );
}, 2500);
```

How autoflush works
-------------------

If autoflush is enabled, the callback function is triggered as soon as the buffer is filled up. 
The data is flushed to the callback function, the buffer starts empty again.

If an interval is set and the capacity is not reached within the time limit, the same as described
above happens and the interval is restarted.

For our "Example" that means: flush all data to the callback function when the buffer holds 100 entries 
or if 15 seconds are over - whatever occurs first.


API Methods
------------
- [capacity()](#capacity)
- [size()](#size)
- [add(entry)](#addentry)
- [flush(callback)](#flushcallback)


### capacity()

Returns the overall capacity of the buffer.

Example:

```js
console.log( lb.capacity() );
// 100
```

### size()

Returns the current filling level of the buffer.

Example:

```js
console.log( lb.size() );
// 2
```

### add(entry)

Adds a log entry to the buffer.  
You can add strings and/or objects - but don't forget to handle them correctly 
when you get the data back!

Example:

```js
let res = lb.add('This is a log line.');

console.log( res );
// OK
```

### flush(callback)

Flushes current data and empties the buffer.

Example:

```js
let data = lb.flush();

console.log( JSON.stringify(data, null, 4) );
/*
[{
    "message": "Logged!",
    "ts": 1473177268820
}, {
    "message": "Logged again!",
    "ts": 1473177271335
}]
*/
```
