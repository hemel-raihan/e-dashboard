import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<h1>this is product page</h1>} />
          <Route path='/add-product' element={<h1>Add product page</h1>} />
          <Route path='/update-product' element={<h1>Update product page</h1>} />
          <Route path='/profile' element={<h1>Profile page</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
