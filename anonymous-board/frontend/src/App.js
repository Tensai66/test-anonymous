import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #6a8caf;
    --secondary-color: #a4c5c6;
    --background-color: #f9f7f7;
    --text-color: #112d4e;
    --accent-color: #e8a87c;
    --success-color: #7eb77f;
    --danger-color: #e27d60;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }
  
  a {
    text-decoration: none;
    color: var(--primary-color);
  }
  
  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 0 10px;
    }
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
