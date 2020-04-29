import React from 'react';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ExBarAvatar from '../experiencebar/ExBarAvatar';
import ExperienceBar from '../experiencebar/ExperienceBar';


const MainPage: React.FC<RouteComponentProps> = () => (
  <Grid
    container
    direction="column"
    justify="flex-end"
    alignItems="stretch"
  >
    <NavBar />
    <ExBarAvatar />
    <ExperienceBar />
  </Grid>
);

export default MainPage;
