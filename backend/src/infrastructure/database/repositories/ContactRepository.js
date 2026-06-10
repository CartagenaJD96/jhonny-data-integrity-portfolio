const pool = require('../connection');
const Contact = require('../../../domain/entities/Contact');

class ContactRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows.map(row => new Contact(row));
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Contact(rows[0]);
  }

  async create(contact) {
    const { name, email, subject, message } = contact;
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    return result.insertId;
  }

  async markAsRead(id) {
    await pool.query('UPDATE contacts SET read_status = 1 WHERE id = ?', [id]);
  }

  async delete(id) {
    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
  }
}

module.exports = ContactRepository;