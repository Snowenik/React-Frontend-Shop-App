import { PublicRoute, PrivateRoute } from "./components/Routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../src/screens/Home";
import Login from "../src/screens/Login";
import Create from "../src/screens/Create";
import Shop from "../src/screens/Shop";
import Basket from "../src/screens/Basket";
import Product from "../src/screens/Product";
import UserInfo from "../src/screens/UserInfo";
import Account from "../src/screens/Account";
import History from "../src/screens/History";

function App() {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route exact path="/" component={Home} />
        <PublicRoute exact path="/login" component={Login} to="/" />
        <PublicRoute exact path="/create" component={Create} to="/" />
        <Route exact path="/shop" component={Shop} />
        <PrivateRoute exact path="/basket" component={Basket} to="/" />
        <Route exact path="/product" component={Product} />
        <PrivateRoute exact path="/user/info" component={UserInfo} to="/" />
        <PrivateRoute exact path="/user/account" component={Account} to="/" />
        <PrivateRoute exact path="/user/history" component={History} to="/" />
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
