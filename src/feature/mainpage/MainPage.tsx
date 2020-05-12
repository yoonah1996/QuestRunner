/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { RootState } from '../index';
import NavBar from '../navbar/NavBar';
import ExBarAvatar from '../experiencebar/ExBarAvatar';
import ExperienceBar from '../experiencebar/ExperienceBar';
import Image from '../../img/rgana.jpg';
import Store from '../store/Store';
import Quest from '../quest/Quest';
import Achievement from '../achievement/Achievement';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      backgroundImage: `url(${Image})`,
    },
  }));

const MainPage: React.FC = () => {
  const selectedComponent = useSelector(
    (state: RootState) => state.nav.navComponent,
  );
  const classes = useStyles();
  return (
    <Grid
      className={classes.bg}
      container
      direction="column"
      justify="flex-end"
      alignItems="stretch"
    >
      <Route component={NavBar} />
      {selectedComponent === 'STORE' && <Route component={Store} />}
      {selectedComponent === 'QUEST' && <Quest />}
      {selectedComponent === 'ACHIEVEMENT' && <Achievement />}
      <Grid
        className={classes.bg}
        container
        direction="column"
        justify="flex-end"
        alignItems="stretch"
        style={{ height: 20, width: '100%', position: 'relative' }}
      >
        <ExBarAvatar />
        <ExperienceBar />
      </Grid>
    </Grid>
  );
};
export default MainPage;
