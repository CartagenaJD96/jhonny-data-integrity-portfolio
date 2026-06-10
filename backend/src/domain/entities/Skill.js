class Skill {
  constructor({ id, name, category, level, icon_url }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.level = level;
    this.icon_url = icon_url;
  }
}

module.exports = Skill;