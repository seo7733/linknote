import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NoteEditor from './pages/NoteEditor';
import NoteView from './pages/NoteView';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="content">
              <div className="container">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/note/new" element={<PrivateRoute><NoteEditor /></PrivateRoute>} />
                  <Route path="/note/:id" element={<PrivateRoute><NoteView /></PrivateRoute>} />
                  <Route path="/note/:id/edit" element={<PrivateRoute><NoteEditor /></PrivateRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 