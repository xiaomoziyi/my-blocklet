const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '../../data/db.json'));
const db = low(adapter);
// 初始化数据库结构
db.defaults({
  profile: {},
}).write();

module.exports = db;
