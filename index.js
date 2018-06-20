const app = require('./server');

const PORT = process.env.PORT || 1337;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`The collective is listening on PORT ${PORT}...`);
});
