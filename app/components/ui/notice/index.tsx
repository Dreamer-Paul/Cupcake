// Hooks
import { useEffect, useState } from "react";


// UI
import styles from "./Notice.module.css";

import { createPortal } from "react-dom";


// Tools
import { type NoticeItem, addFn, removeFn } from "./utils";
import { useHydrated } from "~/hooks/use-hydrated";
import { clsn } from "~/utils";


// Components
function Notice() {
  const [items, setItems] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fn = (notice: NoticeItem) => {
      const key = `${Math.ceil(performance.now())}-${Math.round(Math.random() * 100)}`;

      setItems((prevItems) => [...prevItems, { ...notice, key }]);

      if (notice.duration && notice.duration > 0) {
        setTimeout(() => {
          onCloseWithKey(key);
        }, notice.duration);
      }
    };

    addFn(fn);

    return () => {
      removeFn(fn);
    };
  }, []);

  const onCloseWithKey = (key: string) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.key === key);

      const nextItems = [...prevItems];

      if (index > -1) {
        nextItems.splice(index, 1);
      }

      return nextItems;
    });
  }

  const hydrated = useHydrated();

  if (typeof document === "undefined") {
    return null;
  }

  if (!hydrated) {
    return null;
  }

  return createPortal((
    <div className="fixed top-24 right-0 z-2 mx-4 flex max-w-[30em] flex-col items-end">
      {items.map((item) => {
        const showProgress = !!item.duration && item.duration > 0;

        return (
          <div key={item.key} className="relative overflow-hidden px-5 py-4 pr-14 mb-4 min-w-[20em] rounded-xl bg-pink-100 animate-fade-in-left">
            <button
              className="absolute text-xl font-semibold right-6 text-pink-700 cursor-pointer"
              onClick={() => onCloseWithKey(item.key as string)}
            >
              ×
            </button>
            <h4 className="text-lg font-semibold text-pink-700">{item.title}</h4>
            <p className="text-sm mt-4">
              {item.content}
            </p>
            {showProgress && (
              <div className={clsn("absolute h-1 left-0 right-0 bottom-0 bg-pink-500", styles.progress)} style={{ animationDuration: `${(item.duration || 5000) / 1000}s` }}></div>
            )}
          </div>
        );
      })}
    </div>
  ), document.body);
}

export default Notice;
