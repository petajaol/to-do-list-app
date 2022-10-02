const database = require("./db");

const tasksService = {
  getAll() {
    return database.queryAll(`SELECT * FROM tasks`, []);
  },
  getOne(id) {
    return database.queryOne(`SELECT * FROM tasks WHERE id=?`, [id]);
  },
  create(task) {
    // RETURNING * ???
    database.run("INSERT INTO tasks (name, type, deadline) VALUES (?, ?, ?)", [
      task.name,
      task.type,
      task.deadline,
    ]);
    return database.queryOne(
      "SELECT * FROM tasks WHERE id=last_insert_rowid()",
      []
    );
  },
  update(id, task) {
    // RETURNING * ???
    database.run(
      "UPDATE tasks SET name=COALESCE(?, name), type=COALESCE(?, type), deadline=COALESCE(?, deadline), done=COALESCE(?, done) WHERE id=?",
      [task.name, task.type, task.deadline, task.done, id]
    );
    return database.queryOne("SELECT * FROM tasks WHERE id=?", [id]);
  },
  delete(id) {
    return database.run("DELETE FROM tasks WHERE id=?", [id]);
  },
};

module.exports = tasksService;
