class Project {
  constructor({ id, title, description, tech_stack, github_url, demo_url, image_url, featured, created_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tech_stack = tech_stack;
    this.github_url = github_url;
    this.demo_url = demo_url;
    this.image_url = image_url;
    this.featured = featured;
    this.created_at = created_at;
  }
}

module.exports = Project;