const { APP_BACKEND_EXT_URL } = import.meta.env;

// 获取图片缩略图
export const getImageThumbUrl = (
  url: string,
  { width = 500, height = 500 }: { width?: number; height?: number } = {}
) => {
  // 确保不会出错
  if (!APP_BACKEND_EXT_URL) {
    return url;
  }

  const extUrl = new URL(APP_BACKEND_EXT_URL);
  extUrl.pathname = `/api/image-compress/${new URL(
    url.replace(".mp4", ".jpg")
  ).pathname.replace("/upload/", "")}`;
  extUrl.searchParams.set("w", String(width || 500));
  extUrl.searchParams.set("h", String(height || 500));

  return extUrl.toString();
};
