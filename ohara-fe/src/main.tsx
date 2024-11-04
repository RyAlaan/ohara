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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/users/" element={<DashboardUserPage />} />
            <Route path="/dashboard/users/add" element={<AddUserPage />} />
            <Route
              path="/dashboard/users/edit/:id"
              element={<EditUserPage />}
            />
            <Route path="/dashboard/books" element={<DashboardBooksPage />} />
            <Route path="/dashboard/books/add" element={<AddBookPage />} />
            <Route
              path="/dashboard/books/edit/:id"
              element={<EditBookPage />}
            />
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
