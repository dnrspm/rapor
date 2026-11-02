import styles from "./TabBar.module.css";

const tabs = [
  { label: "Akar Masalah", href: "#akar-masalah", active: true },
  { label: "Inspirasi Benahi", href: "#inspirasi-benahi", active: false },
];

export function TabBar() {
  return (
    <div className={styles.bar}>
      <nav className={styles.inner} aria-label="Bagian halaman">
        {tabs.map((tab) => (
          <a
            key={tab.label}
            href={tab.href}
            className={styles.tab}
            aria-current={tab.active ? "true" : undefined}
          >
            <span className={styles.label}>{tab.label}</span>
            <span
              className={`${styles.indicator} ${tab.active ? styles.active : ""}`}
            />
          </a>
        ))}
      </nav>
    </div>
  );
}
