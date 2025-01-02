const Booking = require('../../models/Booking');

exports.getUserBookings = async (req, res) => {
  const userId = req.user.id;
  try {
    const bookings = await Booking.findAll({ where: { user_id: userId } });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  const { id } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    await booking.update({ status: 'cancelled' });
    res.status(200).json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error cancelling booking' });
  }
};
