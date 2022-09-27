import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Button, CircularProgress } from "@material-ui/core";

const LoadingButton = ({
  onClick
}) => {
  const { promiseInProgress: isLoading } = usePromiseTracker()

  if (isLoading) {
    return <CircularProgress color="primary" size={30} />;
  }
  return (
    <Button onClick={onClick} color="primary" variant="contained">
      Load more
    </Button>
  );
};

export default LoadingButton;