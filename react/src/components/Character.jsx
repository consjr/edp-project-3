import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Planet from "./Planet";

const Character = () => {
  const [charArray, setCharArray] = useState([]);
  const [planetArray, setPlanetArray] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const { id } = useParams();

  // make api call on load
  useEffect(() => {
    async function fetchChar() {
      const url = `http://localhost:3000/api/characters/${id}`;
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

    fetchChar();
  }, []);

  useEffect(() => {
    async function fetchPlanet() {
      const url = `http://localhost:3000/api/characters/${id}/planets`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setPlanetArray(json);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchPlanet();
  }, []);

  useEffect(() => {
    async function fetchFilms() {
      const url = `http://localhost:3000/api/characters/${id}/films`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setFilmsArray(json);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFilms();
  }, []);

  return (
    <>
      {charArray.map((char) => {
        return (
          <div key={char.id}>
            <h1 id="name">{char.name}</h1>
            <section id="generalInfo">
              <p>
                Height: <span id="height">{char.height}</span> cm
              </p>
              <p>
                Mass: <span id="mass">{char.mass}</span> kg
              </p>
              <p>
                Born: <span id="birth_year">{char.birth_year}</span>
              </p>
            </section>
          </div>
        );
      })}
      {planetArray.map((planet) => {
        return (
          <div key={planet.id}>
            <section id="planets">
              <h2>Homeworld</h2>
              <p>
                <span id="homeworld">
                  <Link to={`/planet/${planet.id}`} state={planet}>{planet.name}</Link>
                </span>
              </p>
            </section>
          </div>
        );
      })}
      <section id="films">
        <h2>Films appeared in</h2>
        <ul>
          {filmsArray.map((film) => {
            return (
              <li key={film.id}>
                <Link to={`/film/${film.id}`} element={film}>{film.title}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Character;
