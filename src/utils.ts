/**
 * 根据月份获取当月天数
 * @param {月份} month
 */
export function getDaysByMonth(month: number) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      var year = new Date().getFullYear();
      return year % 400 == 0 || (year % 100 != 0 && year % 4 == 0) ? 29 : 28;
    default:
      break;
  }
}

/**
 * 构建日历数组
 * @param {*} date
 */
export function genereateCalendar(firstWeek = 0, date = new Date()) {
  date = new Date(date);
  // let tempDate = new Date();
  // const day = date.getDate();
  // // 当前时间
  // const tempYear = tempDate.getFullYear();
  // const tempMonth = tempDate.getMonth();
  // const tempDay = tempDate.getDate();
  // // 传入的时间
  const dataYear = date.getFullYear();
  const dateMonth = date.getMonth();
  // const dateDay = date.getDate();
  let arr = [];

  let weekday2;
  //这个月的第一天是周几 weekday = new Date(date.setDate(1)).getDay();
  weekday2 = (new Date(date.setDate(1)).getDay() + 7 - firstWeek) % 7;
  let weekday = new Date(date.setDate(1)).getDay();

  // 这个月有多少天
  const monthDays = getDaysByMonth(date.getMonth() + 1);
  // 构建出数组
  arr = [];
  // 补全前面上个月天数
  for (let i = 0; i < weekday2; i++) {
    arr.push({ day: "" });
  }
  // 构建数据
  for (let i = 1; i <= monthDays; i++) {
    // vo
    const vo = {
      day: i,
      date: dataYear + "-" + (dateMonth + 1) + "-" + i,
      weekday: weekday,
      // today: i === tempDay,
      choose: false
    };
    // 添加进数组
    arr.push(vo);

    weekday++;
    if (weekday == 7) {
      weekday = 0;
    }
  }

  return arr;
}
