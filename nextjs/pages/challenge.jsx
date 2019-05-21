import React from "react";
import { withRouter } from "next/router";
import Layout from "../components/templates/MyLayout";

const Content = withRouter(props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
));

const Challenge = props => (
  <Layout>
    <Content />
  </Layout>
);

export default Challenge;
