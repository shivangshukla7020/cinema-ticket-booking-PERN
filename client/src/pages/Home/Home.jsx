import React from 'react';
import Banner from '../components/Banner';
import MovieSelection from '../components/MovieSelection';
import Event from '../components/Event';

function Home() {
  return (
    <main className="flex-shrink-0 container">
      <Banner />
      <MovieSelection />
      <Event />
    </main>
  );
}

export default Home;
