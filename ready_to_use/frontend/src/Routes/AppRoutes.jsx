import { Route, Routes } from 'react-router-dom';

import Can from '##/src/Components/can/Can.jsx';
import RedirectRoute from '##/src/Components/can/RedirectRoute.jsx';
import lazyLoad from '##/src/LazyLoader.jsx';
import { setComponentDisplayName } from '##/src/utility/utility.js';

const Profile = lazyLoad(() => import('##/src/Routes/Profile.jsx'));
const AdminDashboard = lazyLoad(
  () => import('##/src/Routes/AdminDashboard.jsx'),
);

const UserDashboard = lazyLoad(() => import('##/src/Routes/UserDashboard.jsx'));

const ViewerDashBoard = lazyLoad(
  () => import('##/src/Routes/ViewerDashBoard.jsx'),
);
const CreatorDashBoard = lazyLoad(
  () => import('##/src/Routes/CreatorDashBoard.jsx'),
);

const MainLayout = lazyLoad(
  () => import('##/src/Components/layout/MainLayout.jsx'),
);

const Signup = lazyLoad(() => import('##/src/Routes/Signup.jsx'));
const Login = lazyLoad(() => import('##/src/Routes/Login.jsx'));
const Dashboard = lazyLoad(() => import('##/src/Routes/Dashboard.jsx'));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
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
      <Route
        path="/courses"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'courses-visit',
        })}
      />
      <Route
        path="/messages"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'messages-visit',
        })}
      />
      <Route
        path="/friends"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'friends-visit',
        })}
      />
      <Route
        path="/schedule"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'schedule-visit',
        })}
      />
      <Route
        path="/directory"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'directory-visit',
        })}
      />
      <Route
        path="/settings"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ),
          perform: 'settings-visit',
        })}
      />
      <Route
        path="/profile"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
          perform: 'user-profile-visit',
        })}
      />
      <Route
        path="/messages"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Dashboard />,
          perform: 'user-dashboard-visit',
        })}
      />
      <Route
        path="/friends"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Dashboard />,
          perform: 'user-dashboard-visit',
        })}
      />
      <Route
        path="/schedule"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Dashboard />,
          perform: 'user-dashboard-visit',
        })}
      />
      <Route
        path="/directory"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Dashboard />,
          perform: 'user-dashboard-visit',
        })}
      />
      <Route
        path="/settings"
        loader={async () => ({ Component: Can })}
        element={Can({
          no: () => <RedirectRoute />,
          yes: () => <Dashboard />,
          perform: 'user-dashboard-visit',
        })}
      />
    </Routes>
  );
}

setComponentDisplayName(AppRoutes, 'Alert');
export default AppRoutes;
