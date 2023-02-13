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
    future: '%s later',
    past: '%s ago',
    s: 'A few minutes',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
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
