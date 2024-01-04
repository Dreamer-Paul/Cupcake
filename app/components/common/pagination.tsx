import { clsn } from "~/utils";

interface PaginationProps {
  size: number;
  total: number;
  current: number;
  onClick: (page: number) => void;
}

const genArr = (min: number, max: number) => {
  const arr = [];

  while (min <= max) {
    arr.push(min);
    min++;
  }

  return arr;
}

const calc = (current: number, total: number, size: number) => {
  // 总页数
  const totalPage = Math.ceil(total / size);

  // 左右分隔多少个出现小点点
  const offset = 1;

  // 中间部分，只展示前后各一个分页数
  const prefixEnd = current - 1;
  const suffixStart = current + 1;
  const suffixEnd = current + offset > totalPage ? totalPage : current + offset;

  const prefixs = current > 1 ? genArr(current - offset > 0 ? current - offset : 1, prefixEnd) : [];
  const suffixs = current < totalPage ? genArr(suffixStart, suffixEnd) : [];

  const betweens = [
    ...(current > offset + 1 ? [1, "..."] : []),
    ...prefixs,
    current,
    ...suffixs,
    ...(current > totalPage - (offset + 1) ? [] : ["...", totalPage]),
  ]

  return betweens;
}

function Pagination({ current = 3, total, size, onClick }: PaginationProps) {
  const arr = calc(current, total, size);

  return (
    <div>
      {arr.map((item, index) => {
        if (typeof item === "string") {
          return <span className="p-2 mr-2">{item}</span>
        }

        return (
          <span
            key={index}
            className={clsn(
              "inline-block w-10 h-10 leading-[2] md:w-14 md:h-14 md:leading-[3] cursor-pointer text-center mr-2 last:mr-0 rounded-xl border-4 border-transparent hover:bg-pink-400 hover:border-b-transparent hover:text-white transition-colors",
              current === item ? "bg-cyan-200 border-b-cyan-300 text-white font-bold" : "bg-white border-b-cyan-200"
            )}
            onClick={() => onClick(item)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default Pagination;
