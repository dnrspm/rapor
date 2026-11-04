"use client";

import { useEffect, useId, useRef } from "react";
import type { Material, MaterialType } from "@/lib/content";
import {
  ArrowTopRightOnSquareIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  BookOpenIcon,
  PlayCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import styles from "./MaterialsDialog.module.css";

const typeMeta: Record<MaterialType, { label: string }> = {
  video: { label: "Video" },
  artikel: { label: "Artikel" },
  dokumen: { label: "Dokumen" },
  platform: { label: "Platform" },
};

const typeIcons: Record<MaterialType, typeof PlayCircleIcon> = {
  video: PlayCircleIcon,
  artikel: BookOpenIcon,
  dokumen: DocumentTextIcon,
  platform: ComputerDesktopIcon,
};

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

      <ul className={styles.list}>
        {materials.map((material) => {
          const TypeIcon = typeIcons[material.type];
          return (
            <li key={material.url + material.title}>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <span className={styles.icon}>
                  <TypeIcon width={24} height={24} aria-hidden="true" />
                </span>
                <span className={styles.itemCopy}>
                  <span className={styles.itemTitle}>{material.title}</span>
                  <span className={styles.itemMeta}>
                    <span className={styles.tag}>
                      {typeMeta[material.type].label}
                    </span>
                  </span>
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
    </dialog>
  );
}
