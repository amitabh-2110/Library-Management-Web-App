import './App.css'
import { Route, Routes } from 'react-router-dom';
import Container from './components/container/Container';
import Navbar from './components/navbar/Navbar';
import BorrowedBooks from './components/borrowedBooks/BorrowedBooks';
import AddedBooks from './components/addedBooks/AddedBooks';
import Login from './components/login/Login';
import CreateBook from './components/createBook/CreateBook';
import BookPage from './components/bookPage/BookPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Container />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/create-book" element={<CreateBook />} />

        <Route path="/book/:bookId" element={
          <ProtectedRoute>
            <BookPage />
          </ProtectedRoute>
        } />

        <Route path="/added-books" element={
          <ProtectedRoute>
            <AddedBooks />
          </ProtectedRoute>
        } />

        <Route path="/borrowed-books" element={
          <ProtectedRoute>
            <BorrowedBooks />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App
