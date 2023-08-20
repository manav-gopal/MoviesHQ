const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
    console.log(`CORS Anywhere proxy server listening on ${host}:${port}`);
});
