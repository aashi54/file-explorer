import React from 'react';
import './App.css';
import FileExplorer from './components/FileExplorer';
import Files from './Files';

function App() {
  return (
    <div className="App">
      <FileExplorer data={Files} />
    </div>
  );
}

export default App;
