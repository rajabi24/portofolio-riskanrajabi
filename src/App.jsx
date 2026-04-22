import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer"; 
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <Home />
          <About />
          <Suspense fallback={<div className="h-20" />}>
            <Portofolio />
            <ContactPage />
          </Suspense>
          {/*HAPUS Footer dari sini */}
        </>
      )}
    </>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HelmetProvider>
      {/* Background fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedBackground />
      </div>

      {/* Main content + Footer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <BrowserRouter>
          <Routes>
            {/* PUBLIC */}
            <Route
              path="/"
              element={
                <LandingPage
                  showWelcome={showWelcome}
                  setShowWelcome={setShowWelcome}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            
            {/* ADMIN */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* 404 */}
            <Route
              path="*"
              element={
                <Suspense fallback={null}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
        {!showWelcome && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;