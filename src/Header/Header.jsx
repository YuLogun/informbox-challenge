import React from "react";

import styles from "../styles/Header.scss";

const Header = ({ onClick, heading, numberOfColons }) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>{heading}</h1>
      <button
        onClick={onClick}
        className={`${styles.btn} ${
          numberOfColons === 5 ? styles.btnDisabled : ""
        }`}
      >
        <i className="fa fa-undo" aria-hidden="true" />
        Reset
      </button>
    </header>
  );
};

export default Header;
