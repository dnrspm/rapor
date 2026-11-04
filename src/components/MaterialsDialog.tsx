"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Material } from "@/lib/content";
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import styles from "./MaterialsDialog.module.css";

type Variant = "plain" | "number" | "link";

const variants: { value: Variant; label: string }[] = [
  { value: "plain", label: "Polos" },
  { value: "number", label: "Nomor" },
  { value: "link", label: "Link" },
];

export function MaterialsDialog({
  open,
  onClose,
  title,
  materials,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  materials: Material[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [variant, setVariant] = useState<Variant>("number");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Click on the backdrop (the <dialog> itself) closes the dialog
        if (event.target === ref.current) onClose();
      }}
    >
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={styles.eyebrow}>Materi pendukung</p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Tutup"
        >
          <XMarkIcon width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      <ul className={styles.list} data-variant={variant}>
        {materials.map((material, index) => {
          return (
            <li key={material.url + material.title}>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                {variant === "number" && (
                  <span className={styles.number} aria-hidden="true">
                    {index + 1}
                  </span>
                )}
                {variant === "link" && (
                  <span className={styles.icon} aria-hidden="true">
                    <LinkIcon width={24} height={24} />
                  </span>
                )}
                <span className={styles.itemCopy}>
                  <span className={styles.itemTitle}>{material.title}</span>
                </span>
                <span className={styles.external}>
                  <ArrowTopRightOnSquareIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div role="group" aria-label="Gaya daftar" className={styles.switcher}>
        {variants.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.switcherButton}
            aria-pressed={variant === option.value}
            onClick={() => setVariant(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </dialog>
  );
}
