import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dashboard from './dashboard';

export const adminRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    path: '/tours',
    name: 'Tours',
    icon: ShoppingCartIcon,
  },
  {
    path: '/trips',
    name: 'Trips',
    icon: PeopleIcon,
  },
  {
    path: '/booking',
    name: 'Booking',
    icon: AssignmentIcon,
  },
];
