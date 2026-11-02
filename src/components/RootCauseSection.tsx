import {
  mainIndicator,
  relatedIndicators,
  type Comparison,
  type IndicatorSummary,
} from "@/lib/content";
import { Asset } from "./Asset";
import { StatusLabel, TooltipTrigger, Trend } from "./Indicator";
import styles from "./RootCauseSection.module.css";

function Rule({ children }: { children: string }) {
  return (
    <div className={styles.rule}>
      <span>{children}</span>
      <span className={styles.ruleLine} />
    </div>
  );
}

function ComparisonBlock({ comparison }: { comparison: Comparison }) {
  return (
    <div className={styles.comparison}>
      <Rule>Dibandingkan Satdik lain, Satdik Anda termasuk</Rule>
      <ul className={styles.rankList}>
        <li className={`${styles.rank} ${styles.rankDivided}`}>
          <p>
            <strong>{comparison.provinsi.rank}</strong> (
            {comparison.provinsi.range}) di Provinsi Anda
          </p>
          <span className={styles.rankDivider} />
        </li>
        <li className={`${styles.rank} ${styles.rankLast}`}>
          <p>
            <strong>{comparison.nasional.rank}</strong> (
            {comparison.nasional.range}) secara Nasional
          </p>
        </li>
      </ul>
    </div>
  );
}

function ViewMore({ count }: { count: number }) {
  return (
    <button type="button" className={styles.viewMore}>
      <span>Lihat {count} indikator lainnya</span>
      <Asset
        src="/assets/akar/keyboard-arrow-right.svg"
        width={24}
        height={24}
        className={styles.viewMoreIcon}
      />
    </button>
  );
}

function SubIndicatorList({
  items,
  compact = false,
}: {
  items: IndicatorSummary["subIndicators"];
  compact?: boolean;
}) {
  return (
    <ul className={`${styles.scoreList} ${compact ? styles.scoreListCompact : ""}`}>
      {items.map((item) => (
        <li key={item.name} className={styles.scoreRow}>
          <div className={styles.scoreText}>
            <p className={styles.scoreName}>{item.name}</p>
            <p className={styles.scoreValue}>
              <strong>{item.score}</strong>/100
            </p>
          </div>
          <TooltipTrigger>Detail</TooltipTrigger>
        </li>
      ))}
    </ul>
  );
}

function MainCard({ indicator }: { indicator: IndicatorSummary }) {
  return (
    <div className={styles.mainRow}>
      <article className={styles.mainCard}>
        <div className={styles.head}>
          <h4 className={styles.cardName}>{indicator.name}</h4>
          <div className={styles.progress}>
            <StatusLabel level={indicator.level} fill>
              {indicator.label}
            </StatusLabel>
            <Trend
              direction={indicator.trend.direction}
              value={indicator.trend.value}
            />
          </div>
          <div className={styles.triggers}>
            <TooltipTrigger tight>Apa arti capaian saya?</TooltipTrigger>
            <TooltipTrigger>Persebaran Siswa</TooltipTrigger>
          </div>
        </div>
        <ComparisonBlock comparison={indicator.comparison} />
      </article>

      <div className={styles.listPanel}>
        <div className={styles.listContent}>
          <Rule>Beberapa subindikator yang perlu ditingkatkan</Rule>
          <SubIndicatorList items={indicator.subIndicators} />
        </div>
        {indicator.hiddenCount > 0 ? (
          <ViewMore count={indicator.hiddenCount} />
        ) : null}
      </div>
    </div>
  );
}

function RelatedCard({ indicator }: { indicator: IndicatorSummary }) {
  return (
    <article className={styles.relatedCard}>
      <div className={`${styles.head} ${styles.relatedHead}`}>
        <h4 className={`${styles.cardName} ${styles.relatedName}`}>
          {indicator.name}
        </h4>
        <div className={`${styles.progress} ${styles.relatedProgress}`}>
          <StatusLabel level={indicator.level}>{indicator.label}</StatusLabel>
          <Trend
            direction={indicator.trend.direction}
            value={indicator.trend.value}
          />
        </div>
        <div className={styles.triggers}>
          <TooltipTrigger tight>Apa arti capaian saya?</TooltipTrigger>
        </div>
      </div>

      <ComparisonBlock comparison={indicator.comparison} />

      <div className={styles.relatedList}>
        <Rule>Beberapa subindikator yang perlu ditingkatkan</Rule>
        <SubIndicatorList items={indicator.subIndicators} compact />
        {indicator.hiddenCount > 0 ? (
          <ViewMore count={indicator.hiddenCount} />
        ) : null}
      </div>
    </article>
  );
}

export function RootCauseSection() {
  return (
    <section id="akar-masalah" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.question}>
          Apa saja faktor yang memengaruhi Kemampuan Literasi satuan pendidikan
          saya?
        </h2>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            Subindikator dari Kemampuan Literasi
          </h3>
          <MainCard indicator={mainIndicator} />
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            Faktor dari indikator lain yang memengaruhi capaian indikator
            prioritas
          </h3>
          <div className={styles.relatedRow}>
            {relatedIndicators.map((indicator) => (
              <RelatedCard key={indicator.name} indicator={indicator} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.download}>
        <div className={styles.downloadInner}>
          <div className={styles.downloadCopy}>
            <h3 className={styles.downloadTitle}>
              Unduh Laporan Rapor Pendidikan untuk melihat seluruh akar masalah
            </h3>
            <p className={styles.downloadText}>
              Laporan akan tersedia dalam format Excel dan bisa didapatkan
              melalui halaman Unduh.
            </p>
          </div>
          <a href="#" className={styles.downloadButton}>
            <span>Ke Halaman Unduh</span>
            <Asset src="/assets/akar/arrow-right.svg" width={20} height={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
