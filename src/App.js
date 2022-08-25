import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryEdit from './components/category/CategoryEdit';
import CategoryList from './components/category/CategoryList';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/category' exact={true} element={<CategoryList/>}></Route>
        <Route path='/category/:id' element={<CategoryEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
