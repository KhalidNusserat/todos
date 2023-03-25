import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import SharedTodoListPage from './pages/SharedTodoListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route
            path='/users/:username/shared/todo-lists/:sharedTodoListId'
            element={<SharedTodoListPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
