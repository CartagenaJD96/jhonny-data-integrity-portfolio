const pool = require('../connection');
const Skill = require('../../../domain/entities/Skill');

class SkillRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY category, name');
    return rows.map(row => new Skill(row));
  }

  async getByCategory(category) {
    const [rows] = await pool.query('SELECT * FROM skills WHERE category = ? ORDER BY level DESC', [category]);
    return rows.map(row => new Skill(row));
  }

  async create(skill) {
    const { name, category, level, icon_url } = skill;
    const [result] = await pool.query(
      'INSERT INTO skills (name, category, level, icon_url) VALUES (?, ?, ?, ?)',
      [name, category, level, icon_url]
    );
    return result.insertId;
  }

  async update(id, skill) {
    const { name, category, level, icon_url } = skill;
    await pool.query(
      'UPDATE skills SET name=?, category=?, level=?, icon_url=? WHERE id=?',
      [name, category, level, icon_url, id]
    );
  }

  async delete(id) {
    await pool.query('DELETE FROM skills WHERE id = ?', [id]);
  }
}

module.exports = SkillRepository;