import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import Footer from './components/Footer'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/update-product/:id' element={<UpdateProduct />} />
            <Route path='/profile' element={<h1>Profile page</h1>} />
          </Route>

          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
