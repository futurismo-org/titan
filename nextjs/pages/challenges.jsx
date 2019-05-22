import React from "react";
import fetch from "isomorphic-unfetch";
import { Link } from "../routes";
import Layout from "../components/templates/MyLayout";

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link route="challenges" passHref>
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
