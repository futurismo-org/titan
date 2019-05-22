import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import { Link } from "react-router-dom";

const Challenges = props => {
  const [shows, updateShows] = useState(Array(0));

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
      const data = await res.json();
      updateShows(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Batman TV Shows</h1>
      <ul>
        {shows.map(({ show }) => (
          <li key={show.id}>
            <Link to={`/c/${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;
