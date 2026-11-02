import type { ReactNode } from "react";
import type { Level, TrendDirection } from "@/lib/content";
import { Asset } from "./Asset";
import styles from "./Indicator.module.css";

export function StatusLabel({
  level,
  children,
  fill = false,
}: {
  level: Level;
  children: ReactNode;
  fill?: boolean;
}) {
  return (
    <span
      className={`${styles.label} ${styles[level]} ${fill ? styles.fill : ""}`}
    >
      {children}
    </span>
  );
}

const trendIcons: Record<TrendDirection, string> = {
  down: "/assets/akar/arrow-downward.svg",
  up: "/assets/akar/arrow-upward.svg",
  flat: "/assets/akar/remove.svg",
};

const trendText: Record<TrendDirection, string> = {
  down: "Capaian turun",
  up: "Capaian naik",
  flat: "Capaian tidak berubah",
};

export function Trend({
  direction,
  value,
}: {
  direction: TrendDirection;
  value?: string;
}) {
  return (
    <p className={styles.trend}>
      <span className={styles.trendIcon}>
        <Asset src={trendIcons[direction]} width={20} height={20} />
      </span>
      <span>{trendText[direction]}</span>
      {value ? <strong>{value}</strong> : null}
      <span>dari tahun 2022</span>
    </p>
  );
}

export function TooltipTrigger({
  children,
  tight = false,
}: {
  children: ReactNode;
  tight?: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.trigger} ${tight ? styles.tight : ""}`}
    >
      <Asset src="/assets/akar/visibility.svg" width={18} height={18} />
      <span>{children}</span>
    </button>
  );
}
