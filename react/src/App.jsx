import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';  
import Characters from './components/Characters';
import Character from './components/Character';

import './App.css'
import Film from './components/Film';
import Planet from './components/Planet';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/character/:id"
          element={<Character />}
        />
        <Route
          path="/film/:id"
          element={<Film />}
        />
        <Route
          path="/planet/:id"
          element={<Planet />}
        />
        <Route path="/" element={<Characters />} />
      </Routes>
    </>
  );
}

export default App
