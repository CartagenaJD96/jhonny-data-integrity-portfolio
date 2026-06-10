const ProjectRepository = require('../../../infrastructure/database/repositories/ProjectRepository');

const repository = new ProjectRepository();

class ProjectController {
  async getAll(req, res) {
    try {
      const projects = await repository.getAll();
      res.json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const project = await repository.getById(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
      res.json({ success: true, data: project });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getFeatured(req, res) {
    try {
      const projects = await repository.getFeatured();
      res.json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = await repository.create(req.body);
      res.status(201).json({ success: true, message: 'Proyecto creado', id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      await repository.update(req.params.id, req.body);
      res.json({ success: true, message: 'Proyecto actualizado' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await repository.delete(req.params.id);
      res.json({ success: true, message: 'Proyecto eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ProjectController();