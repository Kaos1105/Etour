import React from 'react';
import clsx from 'clsx';
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import Datatable from '../../../share/components/datatable';
import { State } from '../../reducers';
import { getLoading, getTest, getUsers } from './selectors';
import { connect } from 'react-redux';
import { DashboardActionType, setTest, testUsers } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { DashboardState } from './reducers';

interface Props {
  test: string;
  users: any;
  setTest: (test: string) => void;
  testUsers: any;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    width: 'auto',
    height: 'auto',
  },
}));

export const Dashboard: React.FC<Props> = ({
  test,
  users,
  setTest,
  testUsers,
  loading,
}: Props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleOnClick = () => {
    testUsers();
  };

  const handleOnClickTest = () => {
    setTest(test + ' test ');
  };

  return (
    <Grid item xs={12} md={8} lg={12}>
      <Paper className={fixedHeightPaper}>
        <Datatable />
      </Paper>
      <Paper className={fixedHeightPaper}>
        <p>{loading ? 'loading' : JSON.stringify(users)}</p>
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          test
        </Button>
      </Paper>
      <Paper className={fixedHeightPaper}>
        <p>{test}</p>
        <Button variant="contained" color="primary" onClick={handleOnClickTest}>
          test
        </Button>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: State) => {
  console.log(state);
  return {
    test: getTest(state),
    users: getUsers(state),
    loading: getLoading(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<DashboardState, void, DashboardActionType>,
) => ({
  setTest: (test: string) => dispatch(setTest(test)),
  testUsers: () => dispatch(testUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
