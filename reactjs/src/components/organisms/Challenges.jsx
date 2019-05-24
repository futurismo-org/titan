import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import theme from "../../lib/theme";
import ChallengeCard from "../atoms/ChallengeCard";

const GET_CHALLENGES = gql`
  {
    challenges {
      id
      title
      description
    }
  }
`;

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Challenges = props => {
  const { data, error, loading } = useQuery(GET_CHALLENGES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <React.Fragment>
      <StyledCardGrid container spacing={4}>
        {data.challenges.map(challenge => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </StyledCardGrid>
    </React.Fragment>
  );
};

export default Challenges;
