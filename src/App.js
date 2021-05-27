import './App.css';
import {Jumbotron} from "react-bootstrap"
import Layout from "./components/Layout/index"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Home from "./container/Home"
import Signin from './container/Signin';
import Signup from './container/Signup';
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux";
import PrivateRoute from './HOC/PrivateRoute';
import {React,useEffect} from "react"
import { getAllCategory, getInitialData, isUserLoggedIn } from './actions';
import Products from './container/products';
import Orders from './container/orders/orders';
import Category from "./container/category/category"
import { fetchAllOrders } from './actions/order.action';


const App=()=>
{
  const auth=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!auth.authenticate)
        {
            dispatch(isUserLoggedIn());
            dispatch(fetchAllOrders());
          
        }
        dispatch(getInitialData());
  
        
    },[]);
  
  return <div className="App">
      
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products"  component={Products} />
        <PrivateRoute path="/orders"  component={Orders} />
        <PrivateRoute path="/category"  component={Category} />
        <Route path="/signin"  exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
     
    </div>
  
}

export default App;
