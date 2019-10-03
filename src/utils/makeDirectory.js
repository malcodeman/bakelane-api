import { promises as fs } from "fs";

async function makeDirectory(path) {
  try {
    await fs.mkdir(path);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(`Path ${path} already exists`);
    } else {
      throw error;
    }
  }
}

export default makeDirectory;
