

const logBuffer = require('./index');

function myCallback(data) {
  console.log( 'autoflush: ' + data.toString() );
}

let lb = new logBuffer( 3, { autoflush: { enabled: true, callback: myCallback, interval: 5000 } } );

lb.add('line 1');
lb.add('line 2');
lb.add('line 3');
lb.add('line 4');
lb.add('line 5');

console.log( `buffer size: ${lb.size()}/${lb.capacity()}` );

setTimeout(() => {
  lb.add('line 6');
  lb.add('line 7');
  lb.add('line 8');
  lb.add('line 9');

  console.log( `buffer size: ${lb.size()}/${lb.capacity()}` );
  
}, 10000);
