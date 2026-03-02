import fetch, { FormData, File, Blob } from 'node-fetch'; // if available

import http from 'http';

const req = http.request('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=---boundary'
    }
}, res => {
    res.on('data', d => console.log(d.toString()));
});

req.write('-----boundary\r\n');
req.write('Content-Disposition: form-data; name="name"\r\n\r\n');
req.write('Test Product Name\r\n');
req.write('-----boundary--\r\n');
req.end();
