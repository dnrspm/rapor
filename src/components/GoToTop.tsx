"use client";

import { Asset } from "./Asset";
import styles from "./GoToTop.module.css";

export function GoToTop() {
  return (
    <footer className={styles.footer}>
      <button
        type="button"
        className={styles.button}
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Asset
          src="/assets/rekom/go-to-top.png"
          width={44}
          height={44}
          className={styles.image}
        />
      </button>
    </footer>
  );
}
