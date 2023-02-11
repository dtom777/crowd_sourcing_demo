import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';
import updateLocale from 'dayjs/plugin/updateLocale';

let thresholds = [
  { l: 's', r: 1 },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' },
];
dayjs.extend(updateLocale);
dayjs.extend(relativeTime, { thresholds });
dayjs.locale('ja');
dayjs.updateLocale('ja', {
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '数分',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%d月',
    y: '1年',
    yy: '%d年',
  },
});

const getRelativeTime = (post) => {
  const { createdAt, updatedAt } = post;
  if (updatedAt) {
    const relativeTime = updatedAt;

    return dayjs(relativeTime).fromNow();
  } else {
    const relativeTime = createdAt;

    return dayjs(relativeTime).fromNow();
  }
};

export default getRelativeTime;
