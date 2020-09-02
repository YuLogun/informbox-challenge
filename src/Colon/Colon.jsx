import React from "react";

import styles from "../styles/Colon.scss";

const Colon = React.memo(({ title, info, checked, onChange }) => {
  const reg = /[a-zA-Z]+/gi;
  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={title}
          className={!checked ? styles.hidden : styles.checkbox}
        />
        <span className={!checked ? styles.hidden : ""}>
          {title.match(reg).join(" ").toUpperCase()}
        </span>
      </div>

      <div>
        {info.map((it) => (
          <li
            key={`${it}-key`}
            className={typeof it === "number" ? styles.number : ""}
          >
            {title === "color" ? (
              <div className={styles.colorContainer}>
                <div
                  style={{
                    background: it,
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                  }}
                  className={!checked ? styles.hidden : ""}
                />
                <span className={!checked ? styles.hidden : styles.colorName}>
                  {it}
                </span>
              </div>
            ) : (
              <span className={!checked ? styles.hidden : ""}>
                {title === "name"
                  ? `${it.slice(0, 1).toUpperCase()}${it
                      .slice(1)
                      .toLowerCase()}`
                  : it}
              </span>
            )}
          </li>
        ))}
      </div>
    </div>
  );
});

export default Colon;
