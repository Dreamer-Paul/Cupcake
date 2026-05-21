export interface NoticeItem {
  key?: string;
  title: string;
  duration?: number;
  content: React.ReactNode;
}

type NoticeFn = (notice: NoticeItem) => void;

const addNoticeFn: NoticeFn[] = [];

export const add = (notice: NoticeItem) => {
  addNoticeFn.forEach((item) => {
    // 如果没传递 duration，默认设置为 5000
    if (!("duration" in notice)) {
      notice.duration = 5000;
    }

    item(notice);
  });
}

export const addFn = (fn: NoticeFn) => {
  return addNoticeFn.push(fn) - 1;
}

export const removeFn = (fn: NoticeFn) => {
  const index = addNoticeFn.indexOf(fn);

  if (index > -1) {
    addNoticeFn.splice(index, 1);
  }
}
