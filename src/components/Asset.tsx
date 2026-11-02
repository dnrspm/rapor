/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

type AssetProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Static, decorative asset exported from Figma and served from /public/assets.
 * Fixed intrinsic width/height keep each SVG at its designed size.
 */
export function Asset({ src, width, height, className, style }: AssetProps) {
  return (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className={className}
      style={style}
      aria-hidden="true"
      draggable={false}
    />
  );
}
