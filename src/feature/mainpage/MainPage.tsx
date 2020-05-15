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
import Store from '../store/Store';
import Quest from '../quest/Quest';
import Achievement from '../achievement/Achievement';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: (imgObj: any) => ({
      backgroundImage: `url(${imgObj.image})`,
      backgroundSize: 'cover',
    }),
  }));

const MainPage: React.FC = () => {
  const selectedComponent = useSelector(
    (state: RootState) => state.nav.navComponent,
  );
  const image = useSelector((state: RootState) => state.userLogin.user?.active.background.image);
  const imgObj = {
    image,
  };
  const classes = useStyles(imgObj);
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
