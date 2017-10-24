const http = require('http');
const server = require('./app');

const port = Number(process.env.PORT || '3000');
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});