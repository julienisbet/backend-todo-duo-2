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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM todos
        WHERE id = $1
        `, [id]
    ); return new Todo(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const done = await Todo.getById(id);
    const updatedData = { ...done, ...newAttrs };
    if (!done) return 'false';
    const { rows } = await pool.query(
      `
      UPDATE todos
      SET room = $2, chore = $3, complete = $4
      WHERE id = $1
      RETURNING *
      `, [
        id,
        updatedData.room,
        updatedData.chore,
        updatedData.complete,
      ]
    );
    return new Todo(rows[0]);
  }
};
