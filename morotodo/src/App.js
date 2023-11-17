import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import ToDoFormEdit from './components/ToDoFormEdit';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ToDoList />}></Route>
                    <Route path='/toDo/Create' element={<ToDoForm />}></Route>
                    <Route path='/toDo/Edit/:id' element={<ToDoFormEdit />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
