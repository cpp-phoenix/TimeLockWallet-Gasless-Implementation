import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deposit from './pages/deposit';
import Withdraw from './pages/withdraw';
import Home from './pages/home';
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [publicProvider()],
)
 
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function App() {
  return (
    <WagmiConfig client={client}>
      <div className='h-screen bg-blue-800'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/deposit' element={<Deposit/>} />
            <Route path='/withdraw' element={<Withdraw/>} />
          </Routes>
        </Router>
      </div>
    </WagmiConfig>
  );
}

export default App;
