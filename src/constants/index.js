const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const DB = {
  FOLDER_NAME: ".data",
  FILE_NAME: "database.sqlite3",
  NAME: DB_NAME,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD
};
