const pool = require('../connection');
const BlogPost = require('../../../domain/entities/BlogPost');

class BlogPostRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    return rows.map(row => new BlogPost(row));
  }

  async getPublished() {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC');
    return rows.map(row => new BlogPost(row));
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new BlogPost(rows[0]);
  }

  async create(post) {
    const { title, content, summary, tags, published } = post;
    const [result] = await pool.query(
      'INSERT INTO blog_posts (title, content, summary, tags, published) VALUES (?, ?, ?, ?, ?)',
      [title, content, summary, tags, published]
    );
    return result.insertId;
  }

  async update(id, post) {
    const { title, content, summary, tags, published } = post;
    await pool.query(
      'UPDATE blog_posts SET title=?, content=?, summary=?, tags=?, published=? WHERE id=?',
      [title, content, summary, tags, published, id]
    );
  }

  async delete(id) {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  }
}

module.exports = BlogPostRepository;