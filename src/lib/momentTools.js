import i18next from "i18next";

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
  if (seconds > 0) str.push(`${seconds}초`);
  if (str.length === 0) str.push("0초");
  return str.join(" ");
};

export const getCurrentDateTimeByDivision = () => {
  const t = moment();
  if (moment().hours() < 4) {
    t.subtract(1, "days");
  }

  return t.format("YYYY-MM-DD 04:00:00");
};

export const checkDateTimeIsInTargetDate = (time, targetDate) => {
  const t = moment(targetDate);
  const dst = moment(t.format()).format();
  t.add(1, "days");
  t.subtract(1, "milliseconds");
  const det = moment(t.format()).format();

  const f = moment(time).format();

  return f >= dst && f <= det;
};
