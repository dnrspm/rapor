import { Asset } from "./Asset";
import styles from "./Navigation.module.css";

const links = ["Ringkasan", "Unduh", "Glosarium", "Pusat Bantuan"];

export function Navigation() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="Rapor Pendidikan">
          <span className={styles.kemendikbud}>
            <Asset
              src="/assets/nav/logo-kemendikbud.png"
              width={1772}
              height={1772}
              className={styles.kemendikbudImage}
            />
          </span>
          <Asset
            src="/assets/nav/logo-rapor.svg"
            width={137}
            height={44}
          />
        </a>

        <nav className={styles.menu} aria-label="Navigasi utama">
          {links.map((label) => (
            <a key={label} href="#" className={styles.link}>
              <span className={styles.linkLabel}>{label}</span>
            </a>
          ))}
          <button type="button" className={styles.user} aria-label="Menu akun">
            <span className={styles.avatar}>
              <Asset src="/assets/nav/avatar.svg" width={36} height={36} />
              <span className={styles.initials}>AR</span>
            </span>
            <Asset src="/assets/nav/arrow-down.svg" width={24} height={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
