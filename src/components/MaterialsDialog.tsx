"use client";

import { useEffect, useId, useRef } from "react";
import type { Material, MaterialType } from "@/lib/content";
import styles from "./MaterialsDialog.module.css";

const typeMeta: Record<MaterialType, { label: string }> = {
  video: { label: "Video" },
  artikel: { label: "Artikel" },
  dokumen: { label: "Dokumen" },
  platform: { label: "Platform" },
};

function TypeIcon({ type }: { type: MaterialType }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (type) {
    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m10 9 5 3-5 3z" fill="currentColor" />
        </svg>
      );
    case "artikel":
      return (
        <svg {...common}>
          <path d="M5 4h11l3 3v13H5z" />
          <path d="M8 11h8M8 15h8M8 8h4" />
        </svg>
      );
    case "dokumen":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 13h5M10 17h5" />
        </svg>
      );
    case "platform":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
  }
}

function ExternalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

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
          <p className={styles.subtitle}>
            Pilih materi untuk dipelajari. Tautan akan terbuka di tab baru.
          </p>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Tutup"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <ul className={styles.list}>
        {materials.map((material) => (
          <li key={material.url + material.title}>
            <a
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <span className={`${styles.icon} ${styles[material.type]}`}>
                <TypeIcon type={material.type} />
              </span>
              <span className={styles.itemCopy}>
                <span className={styles.itemTitle}>{material.title}</span>
                <span className={styles.itemMeta}>
                  <span className={styles.tag}>
                    {typeMeta[material.type].label}
                  </span>
                  {material.source}
                </span>
              </span>
              <span className={styles.external}>
                <ExternalIcon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
