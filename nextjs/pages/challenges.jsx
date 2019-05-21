import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Layout from "../components/templates/MyLayout";

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/c/${show.id}`} href={`/challenge?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`); // eslint-disable-line

  return {
    shows: data
  };
};

export default Index;
