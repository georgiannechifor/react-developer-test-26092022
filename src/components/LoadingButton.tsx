import React, { FC } from 'react';
import { Button, CircularProgress } from "@material-ui/core";
import { ButtonProps } from '../types/button';

const LoadingButton: FC<ButtonProps> = ({
  onClick,
  isLoading,
  buttonLabel
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
      {buttonLabel || "Load more"}
    </Button>
  );
};

export default LoadingButton;