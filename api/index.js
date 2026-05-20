const Timetable = require('comcigan-parser');

module.exports = async (req, res) => {
  // 학교 코드 (기본값으로 세팅, 호출 시 주소 뒤에 ?code=학교코드 넣어서 바꿀 수도 있음)
  const schoolCode = req.query.code || 25130;
  
  try {
    const timetable = new Timetable();
    await timetable.init();        // 컴시간 데이터 초기화 및 준비
    await timetable.setSchool(schoolCode); // 우리 학교 설정
    const result = await timetable.getTimetable(); // 시간표 데이터 긁어오기
    
    // 구글 시트가 정상적으로 읽을 수 있도록 표준 데이터(JSON) 형태로 응답
    res.status(200).json(result);
  } catch (error) {
    // 에러 발생 시 버셀 서버가 구글 시트에 에러 메시지를 반환
    res.status(500).json({ error: "데이터 갱신 실패", details: error.message });
  }
};
