const pool = require('../connection');
const Experience = require('../../../domain/entities/Experience');

class ExperienceRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM experience ORDER BY start_date DESC');
    return rows.map(row => new Experience(row));
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM experience WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Experience(rows[0]);
  }

  async create(experience) {
    const { company, role, description, start_date, end_date, technologies, is_current } = experience;
    const [result] = await pool.query(
      'INSERT INTO experience (company, role, description, start_date, end_date, technologies, is_current) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [company, role, description, start_date, end_date, technologies, is_current]
    );
    return result.insertId;
  }

  async update(id, experience) {
    const { company, role, description, start_date, end_date, technologies, is_current } = experience;
    await pool.query(
      'UPDATE experience SET company=?, role=?, description=?, start_date=?, end_date=?, technologies=?, is_current=? WHERE id=?',
      [company, role, description, start_date, end_date, technologies, is_current, id]
    );
  }

  async delete(id) {
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
  }
}

module.exports = ExperienceRepository;