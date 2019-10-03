import app from "./app";

const PORT = process.env.PORT;

async function start() {
  try {
    await app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
