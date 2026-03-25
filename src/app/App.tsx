import { useEffect } from 'react';
import { JewelryPage } from './components/ring/JewelryPage';

export default function App() {
  useEffect(() => {
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    document.body.style.overflowY = 'hidden'; // Hidden until intro animation completes
  }, []);

  return <JewelryPage />;
}
