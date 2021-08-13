import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";

import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";
import Alert from "./components/ui/Alert";
import Dashboard from "./components/Dashboard";
import Customer from "./components/Customer";
import AddUser from "./components/AddUser";
import Track from "./components/Track";
import TrackStatus from "./components/TrackStatus";
import Inventory from "./components/Inventory";
import SubCustomer from "./components/SubCustomer";
import Reports from "./components/Reports";
import Profile from "./components/Profile";
import UploadEcci from "./components/UploadEcci";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />

        <div className='App'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/customer' component={Customer} />
          <PrivateRoute exact path='/add-user' component={AddUser} />
          <Route exact path='/' component={Track} />
          <Route exact path={`/trackStatus/:id`} component={TrackStatus} />
          <PrivateRoute exact path='/inventory' component={Inventory} />
          <PrivateRoute exact path='/sub-customer' component={SubCustomer} />
          <PrivateRoute exact path='/report' component={Reports} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/upload' component={UploadEcci} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
