import React from 'react';
import Banner from './components/Banner';
import MovieSelection from './components/MovieSelection';
import Event from './components/Event';

function Home() {
  return (
    <main className="flex flex-col items-center gap-10 p-4">
      <Banner />
      <MovieSelection />
      <Event />
    </main>
  );
}

export default Home;
