import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryList from './components/category/CategoryList';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/category' exact={true} element={<CategoryList/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
