import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [charArray, setCharArray] = useState([]);

  //click handler to load char data page
  const goToChar = () => {
    console.log("clicked goToChar()");
  };

  // make api call on load
  useEffect(() => {
    async function fetchAllChars() {
      const url = "http://localhost:3000/api/characters";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setCharArray(json);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAllChars();
  }, []);

  return (
    <>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">
          Who you looking for?{" "}
          <span className="small">(Regular expressions are cool here)</span>
        </label>
        <input
          id="searchString"
          //   oninput="filterCharacters()"
          //   autocomplete="off"
        />
      </div>
      <section id="charactersList">
        {charArray.map((char) => {
          return (
            <div key={char.id}>
              <Link to={`/character/${char.id}`}>{char.name}</Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Characters;
