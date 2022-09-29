import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [crypto, setcrypto] = useState('');

  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [eur, setEur] = useState('');
  const [usd, setUsd] = useState('');
  const [des, setDes] = useState('');
  const [flag, setFlag] = useState(false);
  const [state, setState] = useState([]);


  useEffect(() => {
    
    const url = `https://api.coingecko.com/api/v3/coins`;
    axios.get(url)
    .then((response)=>{
      setState(response.data)
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
      setFlag(true)
    })
  }

  const createMarkup = () => {
    return{__html : des}
  }
  
  return (
    
      <div className="App">
        <h1 className='title'>Crypto Currency Search</h1>
        <div className="search">
          <input 
            type="text" 
            value={crypto}
            onChange={(e)=>{setcrypto(e.target.value)}}
            placeholder="Enter the name of crypto"
            required
          />
        </div>

        <button onClick={handleSubmit} type="submit" className="btn">Submit</button>

        <div className="content">
           {state.forEach(element => {
            // console.log('element',element.id)
              return <div className="cryptooo">
                        <img src={element.image.large} width="150"/>
                        <h3>element.id</h3>
                     </div>
              }
            )
          }
        </div>

       

        {flag && <div className="container">
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

                    <div className="des" dangerouslySetInnerHTML={createMarkup()}>
                    </div>
            </div>

          } 

      </div>

  
  );
  
}
export default App;
