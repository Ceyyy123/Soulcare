import React, { useState, useEffect } from 'react';
import Link from 'next/link';  // Importiert Link, um zu einer anderen Seite zu navigieren
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu prüfen
import styles from '../styles/Quote.module.css';  // Importiert die CSS-Stile für diese Seite
import Navbar from './navbar';  // Importiert die Navbar-Komponente
import Footer from './footer';  // Importiert die Footer-Komponente

const DailyQuote = () => {
  // Authentifizierungsstatus aus dem AuthContext
  const { isAuthenticated } = useAuth();
  // Zustand für das Zitat und die Tipps
  const [quote, setQuote] = useState('');
  const [tips, setTips] = useState([]);

  // Array mit inspirierenden Zitaten
  const quotes = [
    '„Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist jetzt.“ - Chinesisches Sprichwort',
    '„Glaube an dich selbst und all das, was du bist. Wisse, dass in dir etwas ist, das größer ist als jedes Hindernis.“ - Christian D. Larson',
    '„Die einzige Grenze zu unserem Realisieren von morgen werden unsere Zweifel von heute sein.“ - Franklin D. Roosevelt',
    '„Jeder Tag ist eine neue Chance, das zu tun, was du möchtest.“',
    '„Selbstfürsorge ist kein Luxus, sondern eine Notwendigkeit.“',
    '„Der einzige Weg, großartige Arbeit zu leisten, ist, zu lieben, was man tut.“ - Steve Jobs',
    '„Sei du selbst, alle anderen sind bereits vergeben.“ - Oscar Wilde',
    '„Das Leben ist zu kurz, um auf den perfekten Moment zu warten. Nimm den Moment und mache ihn perfekt.“',
    '„Der Weg ist das Ziel.“ - Konfuzius',
    '„Der einzige Mensch, der sich vernünftig benimmt, ist mein Schneider. Er nimmt jedes Mal neu Maß, wenn er mich trifft, während alle anderen immer die alten Maßstäbe anlegen in der Meinung, sie passten auch heute noch.“ - George Bernard Shaw',
    '„Du bist nie zu alt, um dir ein neues Ziel zu setzen oder einen neuen Traum zu träumen.“ - C.S. Lewis',
    '„Es sind nicht die Jahre deines Lebens, die zählen. Was zählt, ist das Leben in deinen Jahren.“ - Abraham Lincoln',
    '„Das Geheimnis des Vorwärtskommens besteht darin, den ersten Schritt zu tun.“ - Mark Twain',
    '„Wohin du auch gehst, geh mit deinem ganzen Herzen.“ - Konfuzius',
    '„Das Leben ist das, was passiert, während du fleißig dabei bist, andere Pläne zu schmieden.“ - John Lennon',
    '„Es ist nicht der Berg, den wir bezwingen, sondern wir selbst.“ - Edmund Hillary',
    '„Erfolg ist nicht der Schlüssel zum Glück. Glück ist der Schlüssel zum Erfolg. Wenn du liebst, was du tust, wirst du erfolgreich sein.“ - Albert Schweitzer',
    '„Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.“ - Abraham Lincoln',
    '„Vergeude nicht die Zeit damit, das Leben eines anderen zu leben.“ - Steve Jobs',
    '„Man muss das Unmögliche versuchen, um das Mögliche zu erreichen.“ - Hermann Hesse',
    '„Der einzige Weg, die Dunkelheit zu vertreiben, ist das Licht.“ - Martin Luther King Jr.',
    '„Inmitten von Schwierigkeiten liegen oft die Chancen.“ - Albert Einstein',
    '„Es gibt keine Grenzen. Nicht für den Gedanken, nicht für die Gefühle. Die Angst setzt die Grenzen.“ - Ingmar Bergman',
    '„Jede große Reise beginnt mit einem kleinen Schritt.“ - Laozi',
    '„Lerne aus der Vergangenheit, lebe in der Gegenwart, hoffe auf die Zukunft.“ - Albert Einstein',
    '„Der Mut wächst mit der Gelegenheit.“ - William Shakespeare',
    '„Es ist nie zu spät, das zu werden, was man hätte sein können.“ - George Eliot',
    '„Die größte Gefahr im Leben ist, dass man zu vorsichtig wird.“ - Alfred Adler',
  ];

  // Array mit täglichen Wohlfühl-Tipps
  const dailyTips = [
    'Trinke ausreichend Wasser, um deinen Körper hydratisiert zu halten.',
    'Geh für 30 Minuten nach draußen und genieße die frische Luft.',
    'Beginne den Tag mit einem gesunden Frühstück.',
    'Nimm dir Zeit für dich selbst und entspanne dich bewusst.',
    'Verbringe Zeit mit Freunden oder Familie, um dein Wohlbefinden zu steigern.',
    'Versuche, mindestens 8 Stunden Schlaf zu bekommen, um erholt in den Tag zu starten.',
    'Meditation kann helfen, deinen Geist zu beruhigen und Stress abzubauen.',
    'Schreibe jeden Tag drei Dinge auf, für die du dankbar bist.',
    'Vermeide es, zu viel Zeit vor Bildschirmen zu verbringen, besonders vor dem Schlafengehen.',
    'Plane deinen Tag im Voraus, um Stress zu reduzieren.',
    'Versuche, regelmäßig zu lachen - es ist gut für die Seele.',
    'Setze dir kleine, erreichbare Ziele, um das Gefühl der Erfüllung zu erleben.',
    'Verbringe Zeit in der Natur, um dich mit der Umwelt zu verbinden und inneren Frieden zu finden.',
    'Reduziere deinen Koffeinkonsum, um einen besseren Schlaf zu fördern.',
    'Höre auf deinen Körper - wenn du eine Pause brauchst, nimm sie dir.',
    'Schaffe eine Morgenroutine, die dich positiv in den Tag starten lässt.',
    'Übe regelmäßig Dankbarkeit, um eine positive Einstellung zu fördern.',
    'Lies ein inspirierendes Buch oder Zitat, um deinen Geist zu beleben.',
    'Lass negative Gedanken los und konzentriere dich auf das Positive in deinem Leben.',
    'Teile deine Gedanken und Gefühle mit einem Freund oder Tagebuch, um Klarheit zu gewinnen.',
    'Bewege dich regelmäßig, um dein Energieniveau zu steigern und Stress abzubauen.',
    'Vermeide es, den Tag mit deinem Handy zu beginnen. Nimm dir stattdessen Zeit für dich.',
    'Genieße eine Tasse Tee oder Kaffee in Ruhe, ohne Ablenkungen.',
    'Verbringe Zeit mit einem Haustier, um dich zu entspannen und glücklich zu fühlen.',
  ];

  // Effekt, der beim Laden der Seite das Zitat und die Tipps auswählt
  useEffect(() => {
    const today = new Date().getDate();  // Holt den aktuellen Tag des Monats
    const randomQuote = quotes[today % quotes.length];  // Wählt ein Zitat basierend auf dem aktuellen Tag
    const shuffledTips = dailyTips.sort(() => 0.5 - Math.random()).slice(0, 3);  // Mischt die Tipps und wählt 3 aus
    setQuote(randomQuote);  // Setzt das Zitat
    setTips(shuffledTips);  // Setzt die Tipps
  }, []);

  // Wenn der Benutzer nicht authentifiziert ist, zeigt eine Aufforderung zur Anmeldung an
  if (!isAuthenticated) {
    return (
      <div className={styles.quoteContainer}>
        <p>Bitte melde dich an, um das inspirierende Zitat des Tages und die Wohlfühl-Tipps zu sehen.</p>
        <Link href="/login">
          <div className={styles.resourceButton}>Zum Login</div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />  {/* Fügt die Navbar-Komponente oben auf der Seite ein */}
      <div className={styles.quoteContainer}>
        <div className={styles.content}>
          <div className={styles.quoteSection}>
            <h2 className={styles.quoteText}>Inspirierendes Zitat des Tages</h2>
            <p className={styles.quoteText}>{quote}</p>  
          </div>

          <div className={styles.tipsSection}>
            <h3>Wohlfühl-Tipps des Tages</h3>
            <ul className={styles.tipsList}>
              {tips.map((tip, index) => (
                <li key={index} className={styles.tipItem}>{tip}</li>  
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />  
    </div>
  );
};

export default DailyQuote;
