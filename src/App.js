import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import AllCurrencies from './AllCurrencies';

function App() {
  const [crypto, setCrypto] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [eur, setEur] = useState('');
  const [usd, setUsd] = useState('');
  const [des, setDes] = useState('');
  const [flag, setFlag] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [allCurrencies, setAllCurrencies] = useState(true);


  useEffect(() => {
    
    const url = `https://api.coingecko.com/api/v3/coins`;
    axios.get(url)
    .then((response)=>{
      setCurrencies(response.data)
    })
  },[]);

  const handleSubmit = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;
    axios.get(url)
    .then((response)=>{
      setImg(response.data.image.large);
      setName(response.data.name);
      setSymbol(response.data.symbol);
      setLink(response.data.links.homepage[0]);
      setEur(response.data.market_data.current_price.eur);
      setUsd(response.data.market_data.current_price.usd);  
      setDes(JSON.stringify(response.data.description.en));
      setFlag(true);
      setAllCurrencies(false);
    })
  }

  const handleSelectcrypto = (id) => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    axios.get(url)
    .then((response)=>{
      setImg(response.data.image.large);
      setName(response.data.name);
      setSymbol(response.data.symbol);
      setLink(response.data.links.homepage[0]);
      setEur(response.data.market_data.current_price.eur);
      setUsd(response.data.market_data.current_price.usd);  
      setDes(JSON.stringify(response.data.description.en));
      setFlag(true);
      setAllCurrencies(false);
    })
  }

  const createMarkup = () => {
    return{__html : des}
  }

  const onShowDetailsCurrency = (id) =>{
    setCrypto(id);
    handleSelectcrypto(id);
  }

  const goToHome = () => {
    setFlag(false);
    setAllCurrencies(true);
    setCrypto('');
  }
  
  return (
    
        <div className="App">
          <h1 className='title'>Crypto Currency Search</h1>
          <div className="search">
            <input 
              type="text" 
              value={crypto}
              onChange={(e)=>{setCrypto(e.target.value)}}
              placeholder="Enter the name of crypto"
              required
            />
        </div>

        <button onClick={handleSubmit} type="submit" className="btn">Submit</button>

        {allCurrencies && <div className="content">
            {currencies.map((currency,index) => (
                  <AllCurrencies
                    key={index} 
                    currency={currency}
                    showDetailsCurrency={onShowDetailsCurrency}
                  />
                )
              )
            }
          </div>
        }

        {flag && <>
                    <div className="container">
                        <div className="crypto-info">
                          <img src={img} alt="crypto" width="150"/>
                          <br/>
                          <h1 className="crypto-title">{name}</h1>
                          <h2 className="symbol">{symbol}</h2>
                          <h2><a href={link} className="link">{link}</a></h2>
                          <br/>
                          <h2 className="price">European Price : <i class="fa-solid fa-euro-sign"></i>{eur}</h2>
                          <h2 className="price">United State Price : <i class="fa-solid fa-dollar-sign"></i>{usd}</h2>
                        </div>
                        <div className="des" dangerouslySetInnerHTML={createMarkup()}></div>
                    </div>
                    <button onClick={goToHome}>go To Home</button>
                </>  
          } 

      </div>

  
  );
  
}
export default App;
