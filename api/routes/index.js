const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const db = require('./db.js');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.get('/profile', (req, res) => {
  const data = db.get('profile').value();
  res.json({
    code: 0,
    data,
    msg: 'success',
  });
});

router.post('/profile', (req, res) => {
  const { name, email, phone } = req.body;
  const profile = { name, email, phone };

  db.get('profile').assign(profile).write();

  res.json({
    code: 0,
    data: profile,
    msg: 'success',
  });
});
module.exports = router;
