"use client";

import { useId, useRef, useState } from "react";
import {
  recommendationGroups,
  type Inspiration,
  type RecommendationGroup,
  type RecommendationPanel,
} from "@/lib/content";
import { Asset } from "./Asset";
import { StatusLabel } from "./Indicator";
import { MaterialsDialog } from "./MaterialsDialog";
import styles from "./Recommendations.module.css";

/** Card width (410) + gap (12). */
const CARD_STEP = 422;

function InspirationCard({
  index,
  item,
}: {
  index: number;
  item: Inspiration;
}) {
  return (
    <li className={styles.card}>
      <div className={styles.cardCopy}>
        <p className={styles.cardEyebrow}>Inspirasi {index + 1}</p>
        <p className={styles.cardText}>{item.text}</p>
      </div>
      <div className={styles.thumb}>
        <Asset
          src={item.image}
          width={64}
          height={64}
          className={styles.thumbImage}
        />
        <span className={`${styles.thumbMark} ${styles[item.color]}`} />
      </div>
    </li>
  );
}

function InspirationCarousel({
  items,
  onOpenMaterials,
}: {
  items: Inspiration[];
  onOpenMaterials: () => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const last = items.length - 1;

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(last, index));
    listRef.current?.scrollTo({ left: next * CARD_STEP, behavior: "smooth" });
    setActive(next);
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setActive(atEnd ? last : Math.round(el.scrollLeft / CARD_STEP));
  };

  return (
    <>
      <ul
        ref={listRef}
        className={styles.cards}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Daftar inspirasi"
      >
        {items.map((item, i) => (
          <InspirationCard key={i} index={i} item={item} />
        ))}
      </ul>

      <div className={styles.controls}>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Inspirasi sebelumnya"
          >
            {active === 0 ? (
              <Asset src="/assets/rekom/chevron-left.svg" width={24} height={24} />
            ) : (
              <Asset
                src="/assets/rekom/chevron-right.svg"
                width={24}
                height={24}
                className={styles.flip}
              />
            )}
          </button>
          <div className={styles.dots}>
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={styles.dot}
                onClick={() => goTo(i)}
                aria-label={`Inspirasi ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              >
                <Asset
                  src={
                    i === active
                      ? "/assets/rekom/toggle-active.svg"
                      : "/assets/rekom/toggle-inactive.svg"
                  }
                  width={20}
                  height={20}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active + 1)}
            disabled={active === last}
            aria-label="Inspirasi berikutnya"
          >
            <Asset src="/assets/rekom/chevron-right.svg" width={24} height={24} />
          </button>
        </div>
        <button
          type="button"
          className={styles.cta}
          onClick={onOpenMaterials}
          aria-haspopup="dialog"
        >
          Cek Materi
        </button>
      </div>
    </>
  );
}

function Panel({ panel }: { panel: RecommendationPanel }) {
  const [materialsOpen, setMaterialsOpen] = useState(false);

  return (
    <article className={styles.panel}>
      <div className={styles.panelCopy}>
        <p className={styles.eyebrow}>Membenahi</p>
        <h4 className={styles.panelTitle}>{panel.title}</h4>
        <p className={styles.panelDescription}>{panel.description}</p>
      </div>

      <div className={styles.highlight}>
        <Asset
          src="/assets/rekom/sparkle-orange.svg"
          width={22}
          height={22}
          className={styles.sparkle}
        />
        <p>
          Salah satu upaya yang bisa dilakukan adalah <strong>{panel.highlight}</strong>
          . Berikut beberapa cara konkret yang bisa dijadikan inspirasi:
        </p>
      </div>

      <InspirationCarousel
        items={panel.inspirations}
        onOpenMaterials={() => setMaterialsOpen(true)}
      />

      <MaterialsDialog
        open={materialsOpen}
        onClose={() => setMaterialsOpen(false)}
        title={panel.title}
        materials={panel.materials}
      />
    </article>
  );
}

function Accordion({ group }: { group: RecommendationGroup }) {
  const [open, setOpen] = useState(group.defaultOpen);
  const panelsId = useId();

  return (
    <section className={styles.accordion}>
      <div className={styles.header}>
        <h3 className={styles.groupTitle}>{group.title}</h3>
        <div className={styles.headerRight}>
          <StatusLabel level={group.level}>{group.label}</StatusLabel>
          <Asset src="/assets/rekom/divider.svg" width={1} height={26} />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelsId}
          >
            <span className={styles.toggleLabel}>
              {open ? "Tutup Detail" : "Buka Detail"}
            </span>
            <Asset src="/assets/rekom/expand-more.svg" width={24} height={24} />
          </button>
        </div>
      </div>

      <div id={panelsId} className={styles.panels} hidden={!open || group.panels.length === 0}>
        {group.panels.map((panel) => (
          <Panel key={panel.title} panel={panel} />
        ))}
      </div>
    </section>
  );
}

export function Recommendations() {
  return (
    <section id="inspirasi-benahi" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <Asset
            src="/assets/rekom/sparkle-white.svg"
            width={24}
            height={24}
          />
          <h2>Inspirasi cara membenahi Kemampuan Literasi</h2>
        </div>
        <div className={styles.groups}>
          {recommendationGroups.map((group) => (
            <Accordion key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
