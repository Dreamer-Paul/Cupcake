// 获取第一张图片
export const getFirstImage = (note: API.Note.INoteData) => {
  if (note.media && note.media.length > 0) {
    return note.media[0].url;
  }

  // 遗留版本
  if (note.photo && note.photo.length > 0) {
    return note.photo[0].url;
  }
}
