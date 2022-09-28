import React from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ApiTable from './ApiTable';

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={1}>
        <ApiTable
          fetchData={api.getUsersDiff}
          fetchingArea="users"
        />
        <ApiTable
          fetchData={api.getProjectsDiff}
          fetchingArea="projects"
        />
       
      </Box>
    </Container>
  );
};

export default App;
