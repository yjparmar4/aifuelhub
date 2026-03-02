const net = require('net');
const s = net.createConnection(5432, 'ep-square-frost-adk6btqd.c-2.us-east-1.aws.neon.tech');
s.on('connect', () => { console.log('CONNECTED'); s.destroy(); });
s.on('error', (e) => { console.log('ERROR:', e.message); });
setTimeout(() => { if (!s.destroyed) { s.destroy(); console.log('TIMEOUT - no connection'); } }, 5000);
