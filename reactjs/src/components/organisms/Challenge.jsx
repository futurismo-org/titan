import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

const Challenge = props => {
  const [show, updateShow] = useState({
    name: "",
    summary: "",
    image: ""
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.tvmaze.com/shows/${props.match.params.id}`
      );
      const data = await res.json();
      updateShow(data);
    }
    fetchData();
  }, [props]);

  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?p>/g, "")}</p>
      <img src={show.image.medium} alt="challenge" />
    </div>
  );
};

export default Challenge;
