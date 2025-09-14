export function timeFormatAttrMonthAgo(time: Date) {
    const oneMonthAgoDate = time;
    oneMonthAgoDate.setMonth(new Date().getMonth() - 1);
  
    // 날짜를 'yyyy-mm-dd' 형태로 변환
    const year = oneMonthAgoDate.getFullYear();
    const month = String(oneMonthAgoDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(oneMonthAgoDate.getDate()).padStart(2, '0');
  
    return (
      `${year}-${month}-${day}`
    )
  
  }