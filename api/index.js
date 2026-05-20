const Timetable = require('comcigan-parser');

module.exports = async (req, res) => {
  const schoolCode = req.query.code || 25130;
  try {
    const timetable = new Timetable();
    await timetable.init();
    await timetable.setSchool(schoolCode);
    const result = await timetable.getTimetable();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "데이터 갱신 실패", details: error.message });
  }