import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='App'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;