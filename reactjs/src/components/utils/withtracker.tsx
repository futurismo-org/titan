import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

// Initialize the react-ga plugin using your issued GA tracker code
const GA_TRACKING_ID =
  process.env.REACT_APP_ENV === 'demonstration'
    ? 'UA-137986489-5'
    : 'UA-137986489-3';

ReactGA.initialize(GA_TRACKING_ID);

// React.FC component used as a wrapper for route components - e.g. withTracker(RouteComponent)
export const withTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname);
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};
