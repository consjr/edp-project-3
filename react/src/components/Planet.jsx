import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const Planet = () => {
  const { id } = useParams();

  const {state} = useLocation();

  console.log("state: ", state)
  return (
    <>
      <h1 id="name"></h1>
      <section id="generalInfo">
        <p>
          Climate: <span id="climate"></span>
        </p>
        <p>
          Diameter: <span id="diameter"></span> km
        </p>
        <p>
          Population: <span id="population"></span>
        </p>
      </section>
      <section id="characters">
        <h2>Characters</h2>
        <ul></ul>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul></ul>
      </section>
    </>
  );
};

export default Planet;
