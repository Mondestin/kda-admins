const User = require('../../models/User');

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
}