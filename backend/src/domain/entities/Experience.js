class Experience {
  constructor({ id, company, role, description, start_date, end_date, technologies, is_current }) {
    this.id = id;
    this.company = company;
    this.role = role;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.technologies = technologies;
    this.is_current = is_current;
  }
}

module.exports = Experience;