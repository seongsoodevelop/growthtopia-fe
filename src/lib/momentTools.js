import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("YYYY년 MM월 DD일");
};

export const formatDateShort = (date) => {
  return moment(date).format("MM DD");
};

export const formatDuration = (duration) => {
  duration = Math.floor(duration);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let str = [];

  if (hours > 0) str.push(`${hours}시간`);
  if (minutes > 0) str.push(`${minutes}분`);
  if (str.length === 0) str.push(`${seconds}초`);
  return str.join(" ");
};

export const getDateByDivision = (datetime) => {
  const t = moment(datetime);
  if (t.hours() < 4) {
    t.subtract(1, "days");
  }

  return t.format("YYYY-MM-DD");
};

export const checkDateTimeIsInTargetDateDivision = (at, targetDate) => {
  const t = moment(moment(targetDate).format("YYYY-MM-DD 04:00"));
  const dst = t.format();
  t.add(1, "days");
  t.subtract(1, "milliseconds");
  const det = t.format();

  const f = moment(at).format();

  return f >= dst && f <= det;
};

export const formatWeeksOfMonth = (date) => {
  const t = moment(date);
  t.add(4 - t.day(), "days");

  const s = moment(t);
  s.subtract(s.date() - 1, "days");
  s.add(4 - s.day(), "days");
  if (t.month() !== s.month()) s.add(1, "week");

  const week = t.week() - s.week() + 1;
  return `${moment(t).month() + 1}월 ${week}주차`;
};
