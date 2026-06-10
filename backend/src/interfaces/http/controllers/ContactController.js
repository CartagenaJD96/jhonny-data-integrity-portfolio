const ContactRepository = require('../../../infrastructure/database/repositories/ContactRepository');

const repository = new ContactRepository();

class ContactController {
  async getAll(req, res) {
    try {
      const contacts = await repository.getAll();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const contact = await repository.getById(req.params.id);
      if (!contact) return res.status(404).json({ success: false, message: 'Contacto no encontrado' });
      res.json({ success: true, data: contact });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const id = await repository.create(req.body);
      res.status(201).json({ success: true, message: 'Mensaje enviado correctamente', id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async markAsRead(req, res) {
    try {
      await repository.markAsRead(req.params.id);
      res.json({ success: true, message: 'Contacto marcado como leido' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await repository.delete(req.params.id);
      res.json({ success: true, message: 'Contacto eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ContactController();