import React from 'react';
import { XDCIcon } from '../icons/Icons';

// Transaction Processing Screen
export const TransactionProcessingScreen = ({ ethAmount, xdcaiAmount }) => (
  <div className="screen transaction-processing-screen">
    <div className="header">Processing Transaction</div>
    
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ 
        width: '60px', 
        height: '60px', 
        border: '5px solid #1a1a1a',
        borderTopColor: '#4ade80',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '40px 0'
      }}></div>
      
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div className="processing-text" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '20px', marginBottom: '15px' }}>
          Purchasing {xdcaiAmount} $XDCAI Tokens
        </div>
        <div style={{ color: '#b0b0b0' }}>
          Please wait while we process your transaction...
        </div>
      </div>
      
      <div className="transaction-details" style={{ 
        background: '#1a1a1a', 
        padding: '20px', 
        borderRadius: '10px',
        width: '100%',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#b0b0b0' }}>Amount:</span>
          <span>{ethAmount} ETH</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#b0b0b0' }}>Receiving:</span>
          <span>{xdcaiAmount} $XDCAI</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#b0b0b0' }}>Gas fee:</span>
          <span>~0.0012 ETH</span>
        </div>
      </div>
    </div>
  </div>
);

// Confirmation Screen
export const ConfirmationScreen = ({ xdcaiAmount, handleBackToStart }) => (
  <div className="screen confirmation-screen">
    <div className="header">Transaction Complete!</div>
    
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="success-icon" style={{ 
        width: '80px', 
        height: '80px', 
        background: '#4ade80',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '40px',
        margin: '30px 0',
        color: '#000'
      }}>✓</div>
      
      <div className="confirmation-text" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '24px', marginBottom: '15px', color: '#4ade80' }}>
          You've successfully claimed your tokens!
        </div>
        <div style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
          <p>Your $XDCAI tokens have been added to your XDC wallet.</p>
          <p>Don't forget to participate in staking to earn rewards!</p>
        </div>
      </div>
      
      <div className="token-details" style={{ 
        background: '#1a1a1a', 
        padding: '20px', 
        borderRadius: '10px',
        width: '100%',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#b0b0b0' }}>Token:</span>
          <span><XDCIcon /> $XDCAI</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#b0b0b0' }}>Amount:</span>
          <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{xdcaiAmount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#b0b0b0' }}>Network:</span>
          <span>XDC</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#b0b0b0' }}>Exchange Rate:</span>
          <span>1 $XDCAI = $0.0033722</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
        <button className="btn secondary-btn" style={{ flex: 1 }} onClick={() => window.open('https://explorer.apothem.network', '_blank')}>
          View on Explorer
        </button>
        <button className="btn primary-btn" style={{ flex: 1 }} onClick={handleBackToStart}>
          Back to Home
        </button>
      </div>
    </div>
  </div>
);