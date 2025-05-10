import { Route, Routes } from 'react-router-dom';

import Can from '##/src/Components/can/Can.jsx';
import RedirectRoute from '##/src/Components/can/RedirectRoute.jsx';
import lazyLoad from '##/src/LazyLoader.jsx';
import { setComponentDisplayName } from '##/src/utility/utility.js';

const AdminDashboard = lazyLoad(
  () => import('##/src/Routes/AdminDashboard.jsx'),
);
const UserDashBoard = lazyLoad(() => import('##/src/Routes/UserDashBoard.jsx'));
const Signup = lazyLoad(() => import('##/src/Routes/Signup.jsx'));
const Login = lazyLoad(() => import('##/src/Routes/Login.jsx'));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          //initially yes:()=> <UserDashboard />
          yes: () => <UserDashBoard />,
          perform: 'user-dashboard-visit',
        })}
      />

      <Route
        path="/admin-dashboard"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <AdminDashboard />,
          perform: 'admin-dashboard-visit',
        })}
      />
      <Route
        path="/signup"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Signup />,
          perform: 'sign-up:visit',
        })}
      />
      <Route
        path="/login"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Login />,
          perform: 'sign-in:visit',
        })}
      />
    </Routes>
  );
}

setComponentDisplayName(AppRoutes, 'Alert');
export default AppRoutes;
