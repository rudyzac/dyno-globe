import { useState, useEffect } from 'react';
import EarthGlobe from '../components/EarthGlobe';
import { WorldAtlas } from 'topojson';

const Home = (): JSX.Element => {
  const [geographies, setGeographies] = useState<WorldAtlas>();

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => {
        console.log('Got world atlas from CDN');
        return response.json();
      })
      .then(worldData => {
        console.log(worldData);
        setGeographies(worldData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <>{geographies && <EarthGlobe worldAtlas={geographies} />}</>;
};

export default Home;
