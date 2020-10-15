import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Copyright from '../components/Copyright';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { adminRoutes } from '../../routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const LayoutContent: React.FC = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Switch>
            {adminRoutes.map((route, index) => (
              <Route
                exact
                path={`${path}${route.path}`}
                component={route.component}
                key={index}
              />
            ))}
          </Switch>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
};

export default LayoutContent;
