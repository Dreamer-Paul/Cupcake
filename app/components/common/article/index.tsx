import { clsn } from "~/utils";
import styles from "./article.module.less";

interface ArticleProps {
  className?: string;
  html: string;
}

function Article({ className, html }: ArticleProps) {
  return (
    <article className={clsn(styles.article, className)} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default Article;
