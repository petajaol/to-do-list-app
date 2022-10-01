const database = require("./db");

const tasksService = {
  getAll() {
    return database.query(`SELECT * FROM tasks`, []);
  },
  getOne(id) {
    return database.query(`SELECT * FROM tasks WHERE id=?`, [id]);
  },
  create(task) {
    return database.run(
      "INSERT INTO tasks (name, type, deadline) VALUES (?, ?, ?)",
      [task.name, task.type, task.deadline]
    );
  },
  update(id, task) {
    database.run(
      "UPDATE tasks SET name=COALESCE(?, name), type=COALESCE(?, type), deadline=COALESCE(?, deadline), done=COALESCE(?, done) WHERE id=?",
      [task.name, task.type, task.deadline, task.done, id]
    );
    return { id: parseInt(id), ...task };
  },
  delete(id) {
    return database.run("DELETE FROM tasks WHERE id=?", [id]);
  },
};

module.exports = tasksService;
