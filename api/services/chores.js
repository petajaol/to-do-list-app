const database = require("../services/db");
const choresService = {
  getAll() {
    return database.query(`SELECT * FROM chores`, []);
  },

  getOne(id) {
    return database.query(`SELECT * FROM chores WHERE id=?`, [id]);
  },

  create(chore) {
    return database.run(
      "INSERT INTO chores (name, type, deadline) VALUES (?, ?, ?)",
      [chore.name, chore.type, chore.deadline]
    );
  },

  update(id, chore) {
    return database.run(
      "UPDATE chores SET name=COALESCE(?, name), type=COALESCE(?, type), deadline=COALESCE(?, deadline) WHERE id=?",
      [chore.name, chore.type, chore.deadline, id]
    );
  },

  delete(id) {
    return database.run("DELETE FROM chores WHERE id=?", [id]);
  },
};

module.exports = choresService;
