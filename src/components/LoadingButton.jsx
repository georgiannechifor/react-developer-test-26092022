import React from 'react';
import { Button, CircularProgress } from "@material-ui/core";

const LoadingButton = ({
  onClick,
  isLoading
}) => {

  if (isLoading) {
    return <CircularProgress data-testid="loader" color="primary" size={30} />;
  }
  return (
    <Button
      data-testid="load-more"
      onClick={onClick}
      color="primary"
      variant="contained"
    >
      Load more
    </Button>
  );
};

export default LoadingButton;