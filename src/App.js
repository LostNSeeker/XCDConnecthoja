import React from 'react';
import './App.css';
import XDCAITokenPurchaseFlow from './components/XDCAITokenPurchaseFlow/XDCAITokenPurchaseFlow';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>XDCAI Token Presale</h1>
      </header>
      <main>
        <XDCAITokenPurchaseFlow />
      </main>
      <footer>
        <p>© 2025 XDCAI Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;