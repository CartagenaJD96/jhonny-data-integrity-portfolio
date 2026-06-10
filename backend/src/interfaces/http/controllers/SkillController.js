const SkillRepository = require('../../../infrastructure/database/repositories/SkillRepository');

const repository = new SkillRepository();

class SkillController {
  async getAll(req, res) {
    try {
      const skills = await repository.getAll();
      res.json({ success: true, data: skills });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const skills = await repository.getByCategory(req.params.category);
      res.json({ success: true, data: skills });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = await repository.create(req.body);
      res.status(201).json({ success: true, message: 'Habilidad creada', id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      await repository.update(req.params.id, req.body);
      res.json({ success: true, message: 'Habilidad actualizada' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await repository.delete(req.params.id);
      res.json({ success: true, message: 'Habilidad eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new SkillController();