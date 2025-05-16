const { exec } = require('child_process');

// Thiết lập biến môi trường và chạy server
process.env.NODE_ENV = 'development';
console.log('Starting server in development mode...');

const server = exec('npx tsx server/index.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
  }
  console.log(`Stdout: ${stdout}`);
});

server.stdout.on('data', (data) => {
  console.log(data);
});

server.stderr.on('data', (data) => {
  console.error(data);
});