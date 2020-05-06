import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Theme, createStyles, makeStyles, useTheme,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../index';
import NavBar from '../navbar/NavBar';
import ExBarAvatar from '../experiencebar/ExBarAvatar';
import ExperienceBar from '../experiencebar/ExperienceBar';
import Image from '../../img/rgana.jpg';
import Store from '../store/Store';


const useStyles = makeStyles((theme: Theme) => createStyles({
  bg: {
    backgroundImage: `url(${Image})`,
  },
}));


const MainPage: React.FC = () => {
  const selectedComponent = useSelector((state:RootState) => state.nav.navComponent);
  const classes = useStyles();
  return (
    <Grid
      className={classes.bg}
      container
      direction="column"
      justify="flex-end"
      alignItems="stretch"
    >
      <NavBar />
      {selectedComponent === 'STORE' &&
        <Store />}
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
