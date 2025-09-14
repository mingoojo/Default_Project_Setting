"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeFormatAttrMonthAgo = void 0;
function timeFormatAttrMonthAgo(time) {
    const oneMonthAgoDate = time;
    oneMonthAgoDate.setMonth(new Date().getMonth() - 1);
    // 날짜를 'yyyy-mm-dd' 형태로 변환
    const year = oneMonthAgoDate.getFullYear();
    const month = String(oneMonthAgoDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(oneMonthAgoDate.getDate()).padStart(2, '0');
    return (`${year}-${month}-${day}`);
}
exports.timeFormatAttrMonthAgo = timeFormatAttrMonthAgo;
//# sourceMappingURL=timeFormatAttrMonthAgo.js.map