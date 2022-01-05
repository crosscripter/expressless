const fs = require('fs')
const html = fs.readFileSync('./index.html', 'utf8')

require('http').createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.setHeader('content-type', 'text/html')
            res.end(html)
            break;

        case '/double':
            let data = ''
            req.on('data', chunk => data += chunk)
            res.setHeader('content-type', 'application/json')
            res.writeHead(200)
            req.on('end', () => res.end(JSON.stringify({ newValue: parseInt(JSON.parse(data)?.value, 10) * 2 })))
            break;

        default:
            return res.writeHead(500).end()
    }
}).listen(3005)