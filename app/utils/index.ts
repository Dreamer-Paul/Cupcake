// 站点名称
export const siteTitle = (title?: string | number) => {
  const siteName = import.meta.env.APP_SITENAME;

  return title ? `${title} - ${siteName}` : siteName;
}

// Classnames
export const clsn = (...clsn: (string | undefined | null | false)[]) => {
  return clsn.filter(item => item).join(" ");
}
