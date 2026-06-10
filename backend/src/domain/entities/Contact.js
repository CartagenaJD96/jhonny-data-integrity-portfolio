class Contact {
  constructor({ id, name, email, subject, message, read_status, created_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.read_status = read_status;
    this.created_at = created_at;
  }
}

module.exports = Contact;