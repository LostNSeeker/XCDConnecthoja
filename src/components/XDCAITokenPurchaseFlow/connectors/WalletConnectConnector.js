import React from 'react';
import { WalletConnectIcon } from '../icons/Icons';

// WalletConnect QR Code Screen Component
export const WalletConnectQRScreen = ({ setCurrentScreen, SCREENS }) => (
  <div className="screen wallet-connect-qr-screen">
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <WalletConnectIcon /> Connect with WalletConnect
      </div>
    </div>
    
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="qr-container" style={{ 
        background: 'white', 
        padding: '16px', 
        borderRadius: '12px',
        position: 'relative',
        width: '280px',
        height: '280px',
        margin: '30px 0'
      }}>
        {/* Simulated QR code - in a real app, this would be generated using a WalletConnect library */}
        <svg viewBox="0 0 264 264" width="100%" height="100%">
          <rect width="264" height="264" fill="#ffffff" />
          <path d="M0,0 h24v24h-24z M24,0 h24v24h-24z M48,0 h24v24h-24z M72,0 h24v24h-24z M96,0 h24v24h-24z M120,0 h24v24h-24z M144,0 h24v24h-24z M168,0 h24v24h-24z M192,0 h24v24h-24z M216,0 h24v24h-24z M240,0 h24v24h-24z M0,24 h24v24h-24z M240,24 h24v24h-24z M0,48 h24v24h-24z M48,48 h24v24h-24z M72,48 h24v24h-24z M96,48 h24v24h-24z M144,48 h24v24h-24z M192,48 h24v24h-24z M240,48 h24v24h-24z M0,72 h24v24h-24z M48,72 h24v24h-24z M72,72 h24v24h-24z M96,72 h24v24h-24z M144,72 h24v24h-24z M168,72 h24v24h-24z M192,72 h24v24h-24z M240,72 h24v24h-24z M0,96 h24v24h-24z M48,96 h24v24h-24z M72,96 h24v24h-24z M96,96 h24v24h-24z M120,96 h24v24h-24z M144,96 h24v24h-24z M168,96 h24v24h-24z M192,96 h24v24h-24z M240,96 h24v24h-24z M0,120 h24v24h-24z M240,120 h24v24h-24z M0,144 h24v24h-24z M48,144 h24v24h-24z M72,144 h24v24h-24z M96,144 h24v24h-24z M144,144 h24v24h-24z M192,144 h24v24h-24z M240,144 h24v24h-24z M0,168 h24v24h-24z M48,168 h24v24h-24z M72,168 h24v24h-24z M96,168 h24v24h-24z M144,168 h24v24h-24z M168,168 h24v24h-24z M192,168 h24v24h-24z M240,168 h24v24h-24z M0,192 h24v24h-24z M48,192 h24v24h-24z M72,192 h24v24h-24z M96,192 h24v24h-24z M120,192 h24v24h-24z M144,192 h24v24h-24z M168,192 h24v24h-24z M192,192 h24v24h-24z M240,192 h24v24h-24z M0,216 h24v24h-24z M240,216 h24v24h-24z M0,240 h24v24h-24z M24,240 h24v24h-24z M48,240 h24v24h-24z M72,240 h24v24h-24z M96,240 h24v24h-24z M120,240 h24v24h-24z M144,240 h24v24h-24z M168,240 h24v24h-24z M192,240 h24v24h-24z M216,240 h24v24h-24z M240,240 h24v24h-24z" fill="#3B99FC" />
        </svg>
        
        {/* WalletConnect Logo overlay */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'white', 
          width: '60px', 
          height: '60px', 
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <WalletConnectIcon />
        </div>
      </div>
      
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#b0b0b0' }}>
        <p>Scan this QR code with your WalletConnect compatible wallet</p>
      </div>
      
      <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Or connect with mobile wallet
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        overflowX: 'auto',
        padding: '10px 0',
        width: '100%',
        justifyContent: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: '#3B99FC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>TW</span>
          </div>
          <span style={{ fontSize: '12px', color: '#b0b0b0' }}>Trust</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: '#5299e3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>RW</span>
          </div>
          <span style={{ fontSize: '12px', color: '#b0b0b0' }}>Rainbow</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: '#1a1a1a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>M</span>
          </div>
          <span style={{ fontSize: '12px', color: '#b0b0b0' }}>MetaMask</span>
        </div>
      </div>
    </div>
    
    <button 
      className="btn secondary-btn" 
      style={{ marginTop: '20px' }} 
      onClick={() => setCurrentScreen(SCREENS.CONNECT_WALLET)}
    >
      Back
    </button>
  </div>
);

// Check if WalletConnect is available (always returns true as it doesn't require a browser extension)
export const isWalletConnectAvailable = () => {
  return true; // WalletConnect is a protocol, not an extension
};

// Connect with WalletConnect (this would typically integrate with the WalletConnect library)
export const connectWalletConnect = async (setCurrentScreen, SCREENS) => {
  try {
    // In a real implementation, you would initialize WalletConnect here
    // For this example, we'll just show the QR code screen
    setCurrentScreen(SCREENS.WALLET_CONNECT_QR);
    return { success: true, showQRScreen: true };
  } catch (error) {
    console.error("WalletConnect error:", error);
    return { success: false, error: error.message || 'Unknown error' };
  }
};