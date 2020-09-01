import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Toolbar from "./components/toolbar/Toolbar";
import Login from "./components/authentification/Login";
import Register from "./components/authentification/Register";
import routing from "./components/routing/Routing";
import history from "./services/history"
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux"
import { removeToast } from "./redux/toast/toastActions";
import Toast from "./components/shared/Toast";
import ListDrivers from "./components/drivers/ListDrivers";
import AddDriver from "./components/drivers/AddDriver";
import UpdateDriver from "./components/drivers/UpdateDriver";
import DriverDetails from "./components/drivers/DriverDetails";
import ListStops from "./components/stops/ListStops";
import AddStop from "./components/stops/AddStop";
import StopDetails from "./components/stops/StopDetails";
import UploadStopDetails from "./components/stops/UploadStopDetails";
import UpdateStop from "./components/stops/UpdateStop";
import UpdateUploadStop from "./components/stops/UpdateUploadStop";
import UploadStops from "./components/stops/UploadStops";
import { checkLoggedIn } from "./redux/users/userActions";
import EditAccount from "./components/authentification/EditAccount";


export default function App() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(checkLoggedIn()), [])
  return (
    <Router history={history}>
      <Toolbar />
      <Toast show={toast.show} message={toast.data.message} color={toast.data.color} clearToast={() => dispatch(removeToast())} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/drivers" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={EditAccount} />
        <Route path="/routing" component={routing} />
        <Route exact path="/drivers" component={ListDrivers} />
        <Route path="/drivers/add" component={AddDriver} />
        <Route path="/drivers/update" component={UpdateDriver} />
        <Route path="/drivers/details" component={DriverDetails} />
        <Route exact path="/stops" component={ListStops} />
        <Route path="/stops/add" component={AddStop} />
        <Route path="/stops/update" component={UpdateStop} />
        <Route path="/stops/upload/update" component={UpdateUploadStop} />
        <Route path="/stops/details" component={StopDetails} />
        <Route path="/stops/upload/details" component={UploadStopDetails} />
        <Route path="/stops/upload" component={UploadStops} />
        <Route component={ListDrivers} />
      </Switch>
    </Router>
  );
}
