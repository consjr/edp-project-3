import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Film = () => {
    const { id } = useParams();
  return (
    <>
      <h1 id="title"></h1>
      <section id="generalInfo">
        <p>
          Film director: <span id="director"></span>
        </p>
        <p>
          Release date: <span id="releaseDate"></span>
        </p>
        <p>
          Opening crawl: <span id="openingCrawl"></span>
        </p>
      </section>
      <section id="characters">
        <h2>Characters in the film</h2>
        <ul></ul>
      </section>
      <section id="planets">
        <h2>Planets in the film</h2>
        <ul></ul>
      </section>
    </>
  );
};

export default Film;
