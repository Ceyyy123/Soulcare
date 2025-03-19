import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';
import styles from '../styles/Sucht.module.css';

const Sucht = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get('/api/tips/addiction');
        setTips(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Fehler beim Laden der Sucht-Tipps:', error);
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-200 to-indigo-500">
        <p className="text-xl text-white animate-pulse">Lade Sucht-Tipps...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-indigo-500 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Sucht-Tipps</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-indigo-700 text-xl font-semibold mb-2">Tipp {index + 1}</h2>
              <p className="text-gray-800">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sucht;
