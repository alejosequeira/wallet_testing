import React from 'react';
import styles from './switches.module.css';

function Switchess() {
  return (
    <form>
      <label className={styles.setting}>
        <span className={styles.setting__label}>Comments</span>
        <span className={styles.switch}>
          <input className={styles.switch__input} type="checkbox" role="switch" name="switch1" />
          <span className={styles.switch__fill} aria-hidden="true">
            <span className={styles.switch__text}>ON</span>
            <span className={styles.switch__text}>OFF</span>
          </span>
        </span>
      </label>
      <label className={styles.setting}>
        <span className={styles.setting__label}>Newsletters</span>
        <span className={styles.switch}>
          <input className={styles.switch__input} type="checkbox" role="switch" name="switch2" />
          <span className={styles.switch__fill} aria-hidden="true">
            <span className={styles.switch__text}>ON</span>
            <span className={styles.switch__text}>OFF</span>
          </span>
        </span>
      </label>
      <label className={styles.setting}>
        <span className={styles.setting__label}>Tips</span>
        <span className={styles.switch}>
          <input className={styles.switch__input} type="checkbox" role="switch" name="switch3" defaultChecked />
          <span className={styles.switch__fill} aria-hidden="true">
            <span className={styles.switch__text}>ON</span>
            <span className={styles.switch__text}>OFF</span>
          </span>
        </span>
      </label>
    </form>
  );
}

export default Switchess;
