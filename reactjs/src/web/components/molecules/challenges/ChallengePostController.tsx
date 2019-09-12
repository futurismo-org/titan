import * as React from 'react';
import styled from 'styled-components';

import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Error from '../../atoms/Error';
import { brandSuccess, brandWhite, brandWarning, brandGray } from '~/lib/theme';

import { isDaysValid, isPostPossible } from '~/lib/challenge';

const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChallengePostController = (props: any) => {
  const {
    history,
    recordHandler,
    resetHandler,
    hide,
    participantsRef,
    recordStrategy
  } = props;

  const [value, loading, error] = useDocument(participantsRef);

  const writeRecord = recordHandler(
    window.alert, // eslint-disable-line
    history.push
  );

  const resetRecord = !!resetHandler && resetHandler(history.push);

  const confirm = (props: any) => {
    const { days } = props;
    if (!isDaysValid(days)) return;

    /* eslint-disable */
    if (window.confirm('本当にリセットしますか？')) {
      resetRecord(props);
    }
    /* eslint-enable */
  };

  const data = value && value.data();

  const recordDisabled = !isPostPossible(
    data && data.histories,
    recordStrategy
  );

  return (
    <StyledCenterContainer>
      {error && <Error error={error} />}
      {loading && null}
      {hide
        ? null
        : data && (
            <React.Fragment>
              <div style={{ float: 'left' }}>
                <Button
                  variant="contained"
                  onClick={() => writeRecord(data)}
                  style={{
                    backgroundColor: recordDisabled ? brandGray : brandSuccess,
                    color: brandWhite,
                    marginLeft: 5,
                    fontWeight: 'bold'
                  }}
                  disabled={recordDisabled}
                >
                  記録する
                </Button>
                {!!resetHandler && (
                  <Button
                    variant="contained"
                    onClick={() => confirm(data)}
                    style={{
                      backgroundColor: brandWarning,
                      color: brandWhite,
                      marginLeft: 5,
                      fontWeight: 'bold'
                    }}
                  >
                    リセット
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
    </StyledCenterContainer>
  );
};

export default withRouter(ChallengePostController);
