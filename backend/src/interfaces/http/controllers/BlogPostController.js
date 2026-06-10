const BlogPostRepository = require('../../../infrastructure/database/repositories/BlogPostRepository');

const repository = new BlogPostRepository();

class BlogPostController {
  async getAll(req, res) {
    try {
      const posts = await repository.getAll();
      res.json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPublished(req, res) {
    try {
      const posts = await repository.getPublished();
      res.json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const post = await repository.getById(req.params.id);
      if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });
      res.json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = await repository.create(req.body);
      res.status(201).json({ success: true, message: 'Post creado', id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      await repository.update(req.params.id, req.body);
      res.json({ success: true, message: 'Post actualizado' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await repository.delete(req.params.id);
      res.json({ success: true, message: 'Post eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BlogPostController();