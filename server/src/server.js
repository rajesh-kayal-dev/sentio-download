import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `\x1b[36m%s\x1b[0m`,
    `✦ Sentio Auth Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`\x1b[31m%s\x1b[0m`, `✖ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
