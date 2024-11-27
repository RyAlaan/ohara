import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import HomePage from "./pages/public/HomePage/HomePage";
import AppShell from "./layouts/AppShell/AppShell";
import DashboardPage from "./pages/dashboard/DashboardPage/DashboardPage";
import DashboardBooksPage from "./pages/dashboard/BooksPage/DashboardBooks/DashboardBooks";
import AddBookPage from "./pages/dashboard/BooksPage/AddBook/AddBook";
import * as React from "react";
import EditBookPage from "./pages/dashboard/BooksPage/EditBook/EditBook";
import DashboardUserPage from "./pages/dashboard/UserPage/DashboardUsers/DashboardUsers";
import AddUserPage from "./pages/dashboard/UserPage/AddUser/AddUser";
import EditUserPage from "./pages/dashboard/UserPage/EditUser/EditUser";
import DashboardBorrowing from "./pages/dashboard/BorrowingPage/DashboardBorrowing/DashboardBorrowing";
import BookPage from "./pages/public/BookPage/BookPage";
import BorrowingDetailPage from "./pages/dashboard/BorrowingPage/BorrowingDetailPage/BorrowingDetailPage";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/borrowings/:id" element={<BorrowingDetailPage />} />

            <Route path="dashboard">
              <Route index element={<DashboardPage />} />
              <Route path="users">
                <Route index element={<DashboardUserPage />} />
                <Route path="add" element={<AddUserPage />} />
                <Route path="edit/:id" element={<EditUserPage />} />
              </Route>
              <Route path="books">
                <Route index element={<DashboardBooksPage />} />
                <Route path="add" element={<AddBookPage />} />
                <Route path="edit/:id" element={<EditBookPage />} />
              </Route>
              <Route path="borrowings">
                <Route index element={<DashboardBorrowing />} />
                <Route path=":id" element={<BorrowingDetailPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/auth">
            <Route path="/auth/login" element={<AuthPage />} />
            <Route path="/auth/register" element={<AuthPage />} />
            <Route path="/auth/logout" element={<Navigate to="/" />} />
          </Route>
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
