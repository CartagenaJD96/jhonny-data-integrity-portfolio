const pool = require('../connection');
const Project = require('../../../domain/entities/Project');

class ProjectRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    return rows.map(row => new Project(row));
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Project(rows[0]);
  }

  async getFeatured() {
    const [rows] = await pool.query('SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC');
    return rows.map(row => new Project(row));
  }

  async create(project) {
    const { title, description, tech_stack, github_url, demo_url, image_url, featured } = project;
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, tech_stack, github_url, demo_url, image_url, featured]
    );
    return result.insertId;
  }

  async update(id, project) {
    const { title, description, tech_stack, github_url, demo_url, image_url, featured } = project;
    await pool.query(
      'UPDATE projects SET title=?, description=?, tech_stack=?, github_url=?, demo_url=?, image_url=?, featured=? WHERE id=?',
      [title, description, tech_stack, github_url, demo_url, image_url, featured, id]
    );
  }

  async delete(id) {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  }
}

module.exports = ProjectRepository;