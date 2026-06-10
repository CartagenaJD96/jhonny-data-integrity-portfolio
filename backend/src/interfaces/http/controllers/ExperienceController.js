const ExperienceRepository = require('../../../infrastructure/database/repositories/ExperienceRepository');

const repository = new ExperienceRepository();

class ExperienceController {
  async getAll(req, res) {
    try {
      const experience = await repository.getAll();
      res.json({ success: true, data: experience });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const experience = await repository.getById(req.params.id);
      if (!experience) return res.status(404).json({ success: false, message: 'Experiencia no encontrada' });
      res.json({ success: true, data: experience });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = await repository.create(req.body);
      res.status(201).json({ success: true, message: 'Experiencia creada', id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      await repository.update(req.params.id, req.body);
      res.json({ success: true, message: 'Experiencia actualizada' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await repository.delete(req.params.id);
      res.json({ success: true, message: 'Experiencia eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ExperienceController();