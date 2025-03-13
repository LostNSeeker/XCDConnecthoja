import React from 'react';
import { MetamaskIcon, WalletConnectIcon, PhantomIcon, CoinbaseIcon } from '../icons/Icons';
import { SCREENS } from '../constants';
import { isMetamaskInstalled } from '../connectors/MetamaskConnector';
import { isCoinbaseInstalled } from '../connectors/CoinbaseConnector';

const ConnectWalletScreen = ({ 
  setCurrentScreen, 
  connectWallet, 
  isConnecting, 
  walletType, 
  connectionError,
  connectionStatus 
}) => {
  // Helper function to determine button state
  const getConnectingStatus = (type) => {
    if (isConnecting && walletType === type) {
      return '(connecting...)';
    }
    return '';
  };

  return (
    <div className="screen connect-wallet-screen">
      <div className="header">Connect Wallet</div>
      
      <div className="instruction">
        If you already have a wallet, select it from the options below.
        <br />
        {!isMetamaskInstalled() && !isCoinbaseInstalled() && (
          <div className="install-message">
            You need to install <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="link">Metamask</a> or another wallet to connect.
          </div>
        )}
      </div>
      
      {connectionError && (
        <div className="error-message" style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px' }}>
          {connectionError}
        </div>
      )}
      
      {connectionStatus === 'success' && (
        <div className="success-message" style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
          Connection successful! Loading wallet...
        </div>
      )}
      
      <div className="wallet-options">
        <button 
          className={`wallet-option ${walletType === 'metamask' && connectionStatus === 'connecting' ? 'connecting' : ''}`}
          onClick={() => connectWallet('metamask')} 
          disabled={isConnecting}
          style={walletType === 'metamask' && connectionStatus === 'connecting' ? { borderColor: '#4ade80' } : {}}
        >
          <span>
            Metamask {getConnectingStatus('metamask')}
            {walletType === 'metamask' && connectionStatus === 'connecting' && (
              <span className="spinner" style={{ 
                display: 'inline-block',
                width: '16px', 
                height: '16px', 
                borderRadius: '50%',
                borderTop: '2px solid #4ade80',
                borderRight: '2px solid transparent',
                marginLeft: '10px',
                animation: 'spin 1s linear infinite'
              }}></span>
            )}
          </span> 
          <MetamaskIcon />
        </button>
        
        <button 
          className={`wallet-option ${walletType === 'walletconnect' && connectionStatus === 'connecting' ? 'connecting' : ''}`}
          onClick={() => connectWallet('walletconnect')} 
          disabled={isConnecting}
          style={walletType === 'walletconnect' && connectionStatus === 'connecting' ? { borderColor: '#4ade80' } : {}}
        >
          <span>
            WalletConnect {getConnectingStatus('walletconnect')}
            {walletType === 'walletconnect' && connectionStatus === 'connecting' && (
              <span className="spinner" style={{ 
                display: 'inline-block',
                width: '16px', 
                height: '16px', 
                borderRadius: '50%',
                borderTop: '2px solid #4ade80',
                borderRight: '2px solid transparent',
                marginLeft: '10px',
                animation: 'spin 1s linear infinite'
              }}></span>
            )}
          </span> 
          <WalletConnectIcon />
        </button>
        
        <button 
          className={`wallet-option ${walletType === 'phantom' && connectionStatus === 'connecting' ? 'connecting' : ''}`}
          onClick={() => connectWallet('phantom')} 
          disabled={isConnecting}
          style={walletType === 'phantom' && connectionStatus === 'connecting' ? { borderColor: '#4ade80' } : {}}
        >
          <span>
            Phantom {getConnectingStatus('phantom')}
            {walletType === 'phantom' && connectionStatus === 'connecting' && (
              <span className="spinner" style={{ 
                display: 'inline-block',
                width: '16px', 
                height: '16px', 
                borderRadius: '50%',
                borderTop: '2px solid #4ade80',
                borderRight: '2px solid transparent',
                marginLeft: '10px',
                animation: 'spin 1s linear infinite'
              }}></span>
            )}
          </span> 
          <PhantomIcon />
        </button>
        
        <button 
          className={`wallet-option ${walletType === 'coinbase' && connectionStatus === 'connecting' ? 'connecting' : ''}`}
          onClick={() => connectWallet('coinbase')} 
          disabled={isConnecting}
          style={walletType === 'coinbase' && connectionStatus === 'connecting' ? { borderColor: '#4ade80' } : {}}
        >
          <span>
            Coinbase Wallet {getConnectingStatus('coinbase')}
            {walletType === 'coinbase' && connectionStatus === 'connecting' && (
              <span className="spinner" style={{ 
                display: 'inline-block',
                width: '16px', 
                height: '16px', 
                borderRadius: '50%',
                borderTop: '2px solid #4ade80',
                borderRight: '2px solid transparent',
                marginLeft: '10px',
                animation: 'spin 1s linear infinite'
              }}></span>
            )}
          </span> 
          <CoinbaseIcon />
        </button>
      </div>
      
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <button 
        className="btn secondary-btn" 
        style={{ marginTop: '20px' }} 
        onClick={() => setCurrentScreen(SCREENS.PRESALE)}
        disabled={isConnecting}
      >
        Back
      </button>
    </div>
  );
};

export default ConnectWalletScreen;