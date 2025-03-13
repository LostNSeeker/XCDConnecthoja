import React from 'react';
import { MetamaskIcon, XDCIcon } from '../icons/Icons';

// Post purchase screen when MetaMask needs to be installed
export const PostPurchaseMetamaskScreen = ({ 
  connectToXDC, 
  processingTransaction, 
  handleClaimTokens, 
  account, 
  isXdcNetwork
}) => (
  <div className="screen post-purchase-screen">
    <div className="header">Thanks for purchasing $XDCAI tokens!</div>
    
    <div className="instruction">
      In order to claim your tokens, please download metamask and connect to the XDC network.
    </div>
    
    <div className="steps">
      <div className="step">
        <div className="step-label">Step 1</div>
        <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="btn primary-btn">
          <MetamaskIcon /> Download Metamask
        </a>
      </div>
      
      <div className="step">
        <div className="step-label">Step 2</div>
        <button 
          className="btn secondary-btn" 
          onClick={connectToXDC}
          disabled={processingTransaction}
        >
          {processingTransaction ? 'Connecting...' : <><XDCIcon /> Connect to XDC network!</>}
        </button>
      </div>
    </div>
    
    <div className="final-instruction">
      Once metamask is connected, click on the Claim button below to claim your $XDCAI tokens.
    </div>
    
    <button 
      className="btn primary-btn full-width" 
      onClick={handleClaimTokens} 
      disabled={!account || !isXdcNetwork || processingTransaction}
    >
      {processingTransaction ? 'Processing...' : 'Claim $XDCAI tokens!'}
    </button>
  </div>
);

// Post purchase screen when MetaMask is already installed
export const PostPurchaseXDCScreen = ({ 
  connectToXDC, 
  processingTransaction, 
  handleClaimTokens, 
  account, 
  isXdcNetwork
}) => (
  <div className="screen post-purchase-screen">
    <div className="header">Thanks for purchasing $XDCAI tokens!</div>
    
    <div className="instruction">
      In order to claim your tokens, please connect to the XDC network.
    </div>
    
    <button 
      className="btn primary-btn full-width connect-xdc" 
      onClick={connectToXDC}
      disabled={processingTransaction}
    >
      {processingTransaction ? 'Connecting...' : <><XDCIcon /> Connect to XDC network!</>}
    </button>
    
    <div className="final-instruction">
      Once the XDC network is connected, click on the Claim button below to claim your $XDCAI tokens.
    </div>
    
    <button 
      className="btn primary-btn full-width" 
      onClick={handleClaimTokens} 
      disabled={!account || !isXdcNetwork || processingTransaction}
    >
      {processingTransaction ? 'Processing...' : 'Claim $XDCAI tokens!'}
    </button>
  </div>
);