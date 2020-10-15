import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutMenu from './components/LayoutMenu';
import LayoutAppBar from './components/LayoutAppBar';
import LayoutContent from './container/LayoutContent';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export const AdminLayout: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LayoutAppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <LayoutMenu handleDrawerClose={handleDrawerClose} open={open} />
      <LayoutContent />
    </div>
  );
};

export default AdminLayout;
