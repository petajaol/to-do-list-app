const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("tasks.db"), { fileMustExist: true });

const database = {
  queryOne(sql, params) {
    return db.prepare(sql).get(params);
  },
  queryAll(sql, params) {
    return db.prepare(sql).all(params);
  },
  run(sql, params) {
    return db.prepare(sql).run(params);
  },
};

module.exports = database;
