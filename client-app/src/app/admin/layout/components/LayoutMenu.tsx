import React from 'react';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, Divider, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { DRAWER_WIDTH } from '../constants';
import { adminRoutes } from '../../routes';

interface Props {
  handleDrawerClose: () => void;
  open: boolean;
}

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const DashboardMenu: React.FC<Props> = ({ handleDrawerClose, open }: Props) => {
  const classes = useStyles();
  const { url } = useRouteMatch();

  const mainListItems = (
    <>
      {adminRoutes.map((route, index) => {
        return (
          <Link to={`${url}${route.path}`} key={index}>
            <ListItem button>
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </Link>
        );
      })}
    </>
  );

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <Link to={'/'}>
          <Typography
            component="h1"
            variant="h5"
            color="primary"
            noWrap
            className={classes.title}
          >
            TOURIFY
          </Typography>
        </Link>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
    </Drawer>
  );
};

export default DashboardMenu;
