const database = require("./db");

const tasksService = {
  getAll() {
    return database.queryAll("SELECT * FROM tasks", []);
  },
  getOne(id) {
    return database.queryOne("SELECT * FROM tasks WHERE id=?", [id]);
  },
  getLastInserted() {
    return database.queryOne(
      "SELECT * FROM tasks WHERE id=last_insert_rowid()",
      []
    );
  },
  create(task) {
    const insertInfo = database.run(
      "INSERT INTO tasks (name, type, deadline) VALUES (?, ?, ?)",
      [task.name, task.type, task.deadline]
    );
    return this.getOne(insertInfo.lastInsertRowid);
  },
  update(id, task) {
    database.run(
      "UPDATE tasks SET name=COALESCE(?, name), type=COALESCE(?, type), deadline=COALESCE(?, deadline), done=COALESCE(?, done) WHERE id=?",
      [task.name, task.type, task.deadline, task.done, id]
    );
    return this.getOne(id);
  },
  delete(id) {
    return database.run("DELETE FROM tasks WHERE id=?", [id]);
  },
};

module.exports = tasksService;
