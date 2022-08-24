const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  room;
  chore;
  complete;

  constructor(row) {
    this.id = row.id;
    this.room = row.room;
    this.chore = row.chore;
    this.complete = row.complete;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * FROM todos
        `
    ); return rows.map((row) => new Todo(row));
  }
};
