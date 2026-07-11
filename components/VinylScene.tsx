import styles from "./VinylScene.module.css";

export function VinylScene({ className }: { className?: string }) {
  return (
    <div className={`${styles.scene} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.record}>
        <div className={styles.sheen} />
        <div className={styles.centerLabel}>
          <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
            <g stroke="currentColor" strokeWidth="1.5" opacity="0.55">
              <path d="M28 30 50 22 71 34" />
              <path d="M28 30 50 50 71 34" />
              <path d="M28 50 50 22 71 34" />
              <path d="M28 50 50 50 71 52" />
              <path d="M28 70 50 50 71 52" />
              <path d="M28 70 50 77 71 68" />
              <path d="M28 50 50 77 71 68" />
            </g>
            <g fill="currentColor">
              <circle cx="28" cy="30" r="3" />
              <circle cx="28" cy="50" r="3" />
              <circle cx="28" cy="70" r="3" />
              <circle cx="50" cy="22" r="3" />
              <circle cx="50" cy="50" r="3.5" />
              <circle cx="50" cy="77" r="3" />
              <circle cx="71" cy="34" r="3" />
              <circle cx="71" cy="52" r="3" />
              <circle cx="71" cy="68" r="3" />
            </g>
            <circle cx="50" cy="50" r="5.5" fill="var(--bg)" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className={styles.shadow} />
    </div>
  );
}
