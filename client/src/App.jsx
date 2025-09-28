import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortfolioPreview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLogo from './assets/my-logo.png'; // <-- STEP 1: IMPORT YOUR LOGO

function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen font-sans">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <Link to="/" className="flex items-center space-x-3">
              {/* STEP 2: REPLACE THE SVG WITH AN IMG TAG FOR YOUR LOGO */}
              <img src={CustomLogo} alt="My Portfolio Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-white tracking-tight">Portfolio</span>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<PortfolioForm />} />
            <Route path="/edit/:id" element={<PortfolioForm />} />
            <Route path="/preview/:id" element={<PortfolioPreviewWrapper />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

function PortfolioPreviewWrapper() {
  const { id } = useParams();
  return <PortfolioPreview id={id} />;
}

export default App;

