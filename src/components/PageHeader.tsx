import { Asset } from "./Asset";
import styles from "./PageHeader.module.css";

export function PageHeader() {
  return (
    <section className={styles.header}>
      <div className={styles.inner}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <a href="#" className={styles.crumb}>
            Ringkasan
          </a>
          <Asset
            src="/assets/header/chevron-right.svg"
            width={24}
            height={24}
          />
          <span className={`${styles.crumb} ${styles.current}`} aria-current="page">
            Kemampuan Literasi
          </span>
        </nav>

        <div className={styles.content}>
          <Asset
            src="/assets/header/img-literasi.svg"
            width={84}
            height={84}
          />
          <div className={styles.copy}>
            <div className={styles.titles}>
              <p className={styles.eyebrow}>Pelajari Akar Masalah dari</p>
              <h1 className={styles.title}>Kemampuan Literasi</h1>
            </div>
            <p className={styles.description}>
              Persentase peserta didik berdasarkan kemampuan dalam memahami,
              menggunakan, merefleksi, dan mengevaluasi beragam jenis teks (teks
              informasional dan teks fiksi).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
