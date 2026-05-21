/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useImperativeHandle, forwardRef, type Ref } from "react";
import { createPortal } from "react-dom";
import { X } from "~/components/ui/icons";
import { clsn } from "~/utils";

const parseMeta = (metaStr: string) => {
  try {
    const meta = JSON.parse(metaStr as string);

    if (!meta) {
      return undefined;
    }

    if ("FNumber" in meta) {
      const parts = (meta.FNumber as string).split("/"); // 分割字符串
      const numerator = parseFloat(parts[0]); // 获取分子
      const denominator = parseFloat(parts[1]); // 获取分母
      meta.FNumber = numerator / denominator; // 计算结果
    }

    return meta as Record<string, string | number>;
  } catch (e) {
    return undefined;
  }
};

export interface LightBoxProps {
  className?: string;
  list: Array<API.Media.IMediaData>;
}

export interface LightBoxInst {
  open: (index: number) => void;
}

function LightBox({ className, list }: LightBoxProps, ref: Ref<LightBoxInst>) {
  const [state, setState] = useState({
    loading: false,
    visible: false,
    current: 0,
    fadeOut: false,
  });

  const selectorRef = useRef<HTMLDivElement | null>(null);
  let lastScrollTime = 0;

  useImperativeHandle(ref, () => ({
    open: (index: number) => {
      setState({ ...state, loading: true, visible: true, current: index });
    },
  }));

  const isFirstItem = state.current === 0;
  const isLastItem = state.current === list.length - 1;

  const onPrev = (ev: React.MouseEvent) => {
    ev.stopPropagation();

    if (isFirstItem) {
      return;
    }

    setState({ ...state, loading: true, current: state.current - 1 });
  };

  const onNext = (ev: React.MouseEvent) => {
    ev.stopPropagation();

    if (isLastItem) {
      return;
    }

    setState({ ...state, loading: true, current: state.current + 1 });
  };

  const onClickThumb = (ev: React.MouseEvent, index: number) => {
    ev.stopPropagation();

    setState({ ...state, loading: true, current: index });

    selectorRef.current?.children[state.current].scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  };

  const onLoad = () => {
    setState({ ...state, loading: false });
  };

  const onClose = () => {
    if (state.fadeOut) {
      return;
    }

    setState({ ...state, fadeOut: true });

    setTimeout(() => {
      setState({ ...state, visible: false, fadeOut: false });
    }, 300);
  };

  const onScroll = (ev: React.WheelEvent) => {
    ev.stopPropagation();
    ev.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime < 500) {
      return;
    }

    lastScrollTime = now;

    if (ev.deltaY < 0) {
      onPrev(ev);
    } else {
      onNext(ev);
    }
  };

  if (!state.visible && !state.fadeOut) {
    return null;
  }

  const item = list[state.current];

  if (!item) {
    return null;
  }

  const title = item.title;
  const desc = item.content;
  const src = item.url;
  const isVideo = src.includes("mp4");
  const meta = parseMeta(item.meta as string);

  return createPortal(
    <div
      className={clsn(
        "fixed inset-0 z-50 flex flex-col bg-orange-50 overflow-auto animate-fade-in",
        state.fadeOut && "animate-fade-out",
        state.loading && "loading",
        className,
      )}
    >
      <div className="md:flex md:flex-row flex-1 overflow-auto">
        <div
          className="h-[calc(100%-6em)] md:h-auto flex-1 flex flex-col"
          onWheel={onScroll}
        >
          <div className="flex-1 flex relative p-4" role="img" aria-label={title} onClick={onClose}>
            <button className="absolute top-4 left-4 z-2 p-2 rounded-xl text-xl font-semibold text-pink-700 bg-black/60 cursor-pointer" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
            {isVideo ? (
              <video
                src={src}
                controls
                autoPlay
                onLoadedMetadata={onLoad}
                className="m-auto max-w-full max-h-full cursor-zoom-out absolute rounded-xl bg-gray-800"
              />
            ) : (
              <img
                src={src}
                alt={item.title}
                onLoad={onLoad}
                className="m-auto max-w-[calc(100%-2rem)] md:max-h-[calc(100%-2rem)] inset-0 cursor-zoom-out absolute rounded-xl bg-gray-800"
              />
            )}
          </div>
          <div
            ref={selectorRef}
            className="flex gap-2 p-4 overflow-auto bg-black/10"
          >
            {list.map((item, index) => (
              <img
                key={item.id}
                src={item.thumb_url}
                alt={item.title}
                className={clsn(
                  "w-16 h-16 cursor-pointer border-3 rounded-xl",
                  state.current === index ? "border-pink-400" : "border-transparent"
                )}
                onClick={(ev) => onClickThumb(ev, index)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-96 overflow-y-auto p-4 sm:p-6 bg-white">
          <h2 className="text-2xl/tight font-bold mb-1">{title}</h2>
          <p className="opacity-50 mb-6">
            <small>{item.take_time}</small>
          </p>
          <p className="whitespace-pre-wrap leading-relaxed mb-6">{desc}</p>
          {meta && (
            <div className="grid gap-4 text-center mb-6 grid-cols-2">
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-camera-fill opacity-60 text-xl"></i>
                {meta.Model}
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-cpu-fill opacity-60 text-xl"></i>
                {meta.Make}
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-user-2-fill opacity-60 text-xl"></i>
                {meta.Artist}
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-focus-3-fill opacity-60 text-xl"></i>
                {meta.FocalLengthIn35mmFilm} mm
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-eye-2-fill opacity-60 text-xl"></i>
                F/{meta.FNumber}
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-timer-fill opacity-60 text-xl"></i>
                {meta.ExposureTime} s
              </div>
              <div className="flex gap-2 p-4 rounded-xl bg-cyan-50">
                <i className="ri ri-contrast-fill opacity-60 text-xl"></i>
                ISO {meta.ISOSpeedRatings}
              </div>
            </div>
          )}
          <p>
            &copy; 版权归创作者 {item.author || meta?.Artist || "奇趣保罗"}{" "}
            所有，未经许可严禁转载和使用。
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default forwardRef(LightBox);

export const useLightBox = () => {
  const lightBoxRef = useRef<LightBoxInst>(null);

  return {
    ref: lightBoxRef,
    open: (index: number) => {
      lightBoxRef.current?.open(index);
    },
  };
};
