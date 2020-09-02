import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Colon from "./Colon/Colon";
import Header from "./Header/Header";

import styles from "./styles/App.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    axios
      .get("https://reqres.in/api/unknown?per_page=12")
      .then(({ data }) => {
        setData(data.data);
        return data.data;
      })
      .then((res) => setKeys(Object.keys(res[0])));
  }, []);

  const [checkedVal, setChecked] = useState(() => {
    const item = localStorage.getItem("checkedVal");
    return item
      ? JSON.parse(item)
      : {
          id: true,
          year: true,
          color: true,
          name: true,
          pantone_value: true,
        };
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setChecked((state) => {
      const newState = { ...state, [name]: checked };
      localStorage.setItem("checkedVal", JSON.stringify(newState));
      return newState;
    });
  };

  const handleClick = () =>
    setChecked(() => {
      const newState = {
        id: true,
        year: true,
        color: true,
        name: true,
        pantone_value: true,
      };
      localStorage.setItem("checkedVal", JSON.stringify(newState));
      return newState;
    });

  const numberOfColons = Object.values(checkedVal).filter((it) => it === true)
    .length;

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Header
          onClick={handleClick}
          heading="Pantone colors"
          numberOfColons={numberOfColons}
        />
        <div className={styles.colonContainer}>
          {keys.map((it) => (
            <Colon
              key={`${it}-key`}
              title={it}
              checked={checkedVal[it]}
              info={data.map((it2) => it2[it])}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default hot(App);
