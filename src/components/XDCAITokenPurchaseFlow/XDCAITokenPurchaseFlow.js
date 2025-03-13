import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './XDCAITokenPurchaseFlow.css';

// Import constants
import { SCREENS, XDC_APOTHEM_CONFIG } from './constants';

// Import wallet connectors - removed unused imports
import { isMetamaskInstalled, connectMetamask, connectToXDCNetwork } from './connectors/MetamaskConnector';
import { connectPhantom } from './connectors/PhantomConnector';
import { connectCoinbase } from './connectors/CoinbaseConnector';
import { connectWalletConnect, WalletConnectQRScreen } from './connectors/WalletConnectConnector';

// Import UI screens
import PresaleScreen from './screens/PresaleScreen';
import ConnectWalletScreen from './screens/ConnectWalletScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import WalletBalanceScreen from './screens/WalletBalanceScreen';
import { PostPurchaseMetamaskScreen, PostPurchaseXDCScreen } from './screens/PostPurchaseScreens';
import { TransactionProcessingScreen, ConfirmationScreen } from './screens/ProcessingAndConfirmation';

// Main component
const XDCAITokenPurchaseFlow = () => {
  // State for form inputs and wallet connection
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PRESALE);
  const [ethAmount, setEthAmount] = useState('0');
  const [xdcaiAmount, setXdcaiAmount] = useState('0');
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [isXdcNetwork, setIsXdcNetwork] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [processingTransaction, setProcessingTransaction] = useState(false);

  // Connect wallet handler
  const connectWallet = async (type) => {
    let connectResult = { success: false };
    
    try {
      setIsConnecting(true);
      setWalletType(type);
      setConnectionError('');
      
      // Handle the specific wallet type that was clicked
      switch(type) {
        case 'metamask':
          connectResult = await connectMetamask(
            setAccount, 
            setProvider, 
            setBalance, 
            setIsXdcNetwork, 
            setConnectionError
          );
          break;
          
        case 'walletconnect':
          connectResult = await connectWalletConnect(setCurrentScreen, SCREENS);
          return; // WalletConnect handles its own navigation
          
        case 'phantom':
          connectResult = await connectPhantom(setConnectionError);
          break;
          
        case 'coinbase':
          connectResult = await connectCoinbase(
            setAccount, 
            setProvider, 
            setBalance, 
            setIsXdcNetwork, 
            setConnectionError
          );
          break;
          
        default:
          throw new Error('Unsupported wallet type');
      }
      
      // If connection was successful and returned account, navigate to purchase screen
      if (connectResult.success && connectResult.account) {
        setCurrentScreen(SCREENS.PURCHASE);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setConnectionError('Failed to connect wallet: ' + (error.message || 'Unknown error'));
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setBalance(null);
    setCurrentScreen(SCREENS.PRESALE);
  };

  // Connect to XDC network
  const connectToXDC = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setProcessingTransaction(true);
      
      const result = await connectToXDCNetwork(provider, XDC_APOTHEM_CONFIG);
      
      if (result.success) {
        setIsXdcNetwork(true);
        setCurrentScreen(SCREENS.POST_PURCHASE_XDC);
      } else {
        alert('Failed to switch to XDC Apothem network. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to XDC network:', error);
      alert('Failed to connect to XDC Apothem network: ' + (error.message || 'Unknown error'));
    } finally {
      setProcessingTransaction(false);
    }
  };

  // Effect to refresh balance if account changes
  useEffect(() => {
    if (provider && account) {
      const getBalance = async () => {
        const balanceWei = await provider.getBalance(account);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setBalance(balanceEth);
      };
      
      getBalance();
      
      // Listen for account changes
      if (window.ethereum) {
        const handleAccountsChanged = (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            disconnectWallet();
          }
        };
        
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        // Cleanup
        return () => {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
      }
    }
  }, [provider, account]);

  const handleBuyXDCAI = () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    
    if (parseFloat(ethAmount) <= 0) {
      alert('Please enter a valid ETH amount!');
      return;
    }
    
    // If MetaMask is already installed, go to the direct XDC connection screen
    if (isMetamaskInstalled()) {
      setCurrentScreen(SCREENS.POST_PURCHASE_XDC);
    } else {
      // If MetaMask is not installed, go to the screen with download instructions
      setCurrentScreen(SCREENS.POST_PURCHASE_METAMASK);
    }
  };

  const handleShowWalletBalance = () => {
    setCurrentScreen(SCREENS.WALLET_BALANCE);
  };

  const handleClaimTokens = () => {
    // Show processing screen first
    setCurrentScreen(SCREENS.TRANSACTION_PROCESSING);
    
    // Simulate transaction processing with a timeout
    setTimeout(() => {
      // After "processing", show confirmation screen
      setCurrentScreen(SCREENS.CONFIRMATION);
    }, 2000);
  };

  const handleEthAmountChange = (e) => {
    setEthAmount(e.target.value);
    // Calculate XDCAI amount based on exchange rate (1 $XDCAI = $0.0033722)
    setXdcaiAmount((parseFloat(e.target.value || 0) / 0.0033722).toFixed(2));
  };

  const handleBackToStart = () => {
    setCurrentScreen(SCREENS.PRESALE);
    // Reset states
    setEthAmount('0');
    setXdcaiAmount('0');
    setAccount(null);
    setProvider(null);
    setBalance(null);
    setWalletType(null);
    setIsXdcNetwork(false);
    setConnectionError('');
  };

  // Render current screen based on state
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case SCREENS.PRESALE:
        return <PresaleScreen setCurrentScreen={setCurrentScreen} />;
        
      case SCREENS.CONNECT_WALLET:
        return (
          <ConnectWalletScreen 
            setCurrentScreen={setCurrentScreen}
            connectWallet={connectWallet}
            isConnecting={isConnecting}
            walletType={walletType}
            connectionError={connectionError}
          />
        );
        
      case SCREENS.PURCHASE:
        return (
          <PurchaseScreen 
            account={account}
            disconnectWallet={disconnectWallet}
            ethAmount={ethAmount}
            handleEthAmountChange={handleEthAmountChange}
            xdcaiAmount={xdcaiAmount}
            balance={balance}
            handleBuyXDCAI={handleBuyXDCAI}
            handleShowWalletBalance={handleShowWalletBalance}
            setCurrentScreen={setCurrentScreen}
          />
        );
        
      case SCREENS.WALLET_BALANCE:
        return (
          <WalletBalanceScreen 
            account={account}
            balance={balance}
            setCurrentScreen={setCurrentScreen}
          />
        );
        
      case SCREENS.POST_PURCHASE_METAMASK:
        return (
          <PostPurchaseMetamaskScreen 
            connectToXDC={connectToXDC}
            processingTransaction={processingTransaction}
            handleClaimTokens={handleClaimTokens}
            account={account}
            isXdcNetwork={isXdcNetwork}
          />
        );
        
      case SCREENS.POST_PURCHASE_XDC:
        return (
          <PostPurchaseXDCScreen 
            connectToXDC={connectToXDC}
            processingTransaction={processingTransaction}
            handleClaimTokens={handleClaimTokens}
            account={account}
            isXdcNetwork={isXdcNetwork}
          />
        );
        
      case SCREENS.TRANSACTION_PROCESSING:
        return (
          <TransactionProcessingScreen 
            ethAmount={ethAmount}
            xdcaiAmount={xdcaiAmount}
          />
        );
        
      case SCREENS.CONFIRMATION:
        return (
          <ConfirmationScreen 
            xdcaiAmount={xdcaiAmount}
            handleBackToStart={handleBackToStart}
          />
        );
        
      case SCREENS.WALLET_CONNECT_QR:
        return <WalletConnectQRScreen setCurrentScreen={setCurrentScreen} SCREENS={SCREENS} />;
        
      default:
        return <PresaleScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  // Add useEffect to help debug state changes
  useEffect(() => {
    console.log("Current screen changed to:", currentScreen);
    console.log("Current account:", account);
  }, [currentScreen, account]);

  return (
    <div className="xdcai-token-purchase-flow">
      {renderCurrentScreen()}
    </div>
  );
};

export default XDCAITokenPurchaseFlow;