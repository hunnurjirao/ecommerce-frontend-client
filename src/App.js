import { Route, Switch } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AllOrders from './userPages/AllOrders';
import CartProducts from './userPages/CartProducts';
import Orders from './userPages/Orders';


function App() {

  function googleTranslateElementInit() {
    const google = window.google;
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  }

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%' }}>
      <Navbar />
      <div id="google_translate_element" >
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/register'> <Register /> </Route>
          <Route path='/cartProducts'> <CartProducts /> </Route>
          <Route path='/orders'> <Orders /> </Route>
          <Route path='/allOrders'> <AllOrders /> </Route>
          <Route path='/login'> <Login /> </Route>
          <Route path='/logout'> <Logout /> </Route>
        </Switch>
        {googleTranslateElementInit}
      </div>
    </div>
  );
}

export default App;
