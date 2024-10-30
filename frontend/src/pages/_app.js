// src/pages/_app.js
import '../styles/globals.css';  // Falls diese Datei existiert und globale Stile enthält
import { AuthProvider } from '../AuthContext';
import '../styles/form.css'; 
import '../styles/About.module.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
