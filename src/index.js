import ReactDOM from "react-dom";
import "./index.css";
import axios from 'axios';
import React, {useState} from 'react';


function App() {

    const query = `

 {
  tokenDayDatas(orderDirection: desc
  orderBy: dailyVolumeUSD
    where: {
      token_not_in: [
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        "0xdac17f958d2ee523a2206206994597c13d831ec7"
        "0x6b175474e89094c44da98b954eedeac495271d0f"
        "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
        "0xd46ba6d942050d489dbd938a2c909a5d5039a161"
        "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
        "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"
        "0x514910771af9ca656af840dff83e8264ecf986ca"
        "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
        "0x62359ed7505efc61ff1d56fef82158ccaffa23d7"
        "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44"
        "0x429881672b9ae42b8eba0e26cd9c73711b891ca5"
        "0x57ab1ec28d129707052df4df418d58a2d46d5f51"
        "0x80fb784b7ed66730e8b1dbd9820afd29931aab03"
        "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"
        "0xa0246c9032bc3a600820415ae600c6388619a14d"
        "0xc00e94cb662c3520282e6f5717214004a7f26888"
        "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c"
        "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8"       
      ]
    }
  first: 100) {
    dailyVolumeUSD
    token {
      id
      symbol
    name
    decimals
    }
    priceUSD
      
    }
}
  `;


    //todo:change book to token class

    const baseURL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2";
    const [books, setBooks] = useState(null);
    const fetchData = async () => {
        const response = await axios.post(baseURL, {query});
        setBooks(response.data)

    }
    let set = new Set();
    let count = 0;

    const btn = document.querySelector(".button");

    if(btn) {
        btn.classList.add("button--loading");
        btn.classList.remove("button--loading");
    }
    return (
        <html>
        <head>
        </head>

        <body>
        <div className="App">
            {/*<div className="bgimg-1"></div>*/}

            <h1><b>Uniswap Trending Gems</b></h1>
            <h1>  </h1>
            <h2>This gives top 20 Trending Uniswap picks For Today<br/>
                If you haven't heard about any of the coin in the list yet, Time to ape in !<br/>
                And yes its spam proof
            </h2>
            <h3>
                <a href="https://thegraph.com/explorer/">Build On TheGraph</a>

            </h3>



            <div>
                {/*<button className="fetch-button" onClick={fetchData}>*/}
                {/*    Get Today's Uniswap Trending Gems*/}
                {/*</button>*/}

                <div className="button" onClick={fetchData}>
                    Get Today's Uniswap Trending Gems
                </div>




                {/* Display data from API */}
                <div className="books">
                    {books && books.data && books.data.tokenDayDatas &&
                    books.data.tokenDayDatas.map((book, index) => {
                        // const cleanedDate = new Date(book.released).toDateString();
                        // const authors = book.authors.join(', ');

                        if (!set.has(book.token.id)) {
                            count = count + 1;
                            if (count > 20) {
                                return <div>

                                </div>
                            }
                            console.log(book.token.id)
                            set.add(book.token.id)
                            return (
                                <div className="book" key={index}>
                                    {/*<h3>TOKEN {index + 1}</h3>*/}
                                    <h3>TOKEN #{count} INFO</h3>
                                    <h2>{book.token.name}</h2>

                                    <div className="details">
                                        <p><b>TOKEN SYMBOL:</b> {book.token.symbol}</p>
                                        <p><b>DAILY USD VOLUME:</b> {book.dailyVolumeUSD}</p>
                                        <p><b>TOKEN CONTRACT ADDRESS:</b> {book.token.id}</p>
                                        <p><b>DECIMALS:</b> {book.token.decimals}</p>
                                    </div>
                                </div>
                            );
                        } else
                            return <div>

                            </div>

                    })}
                </div>
            </div>
        </div>
        </body>
        </html>

    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);


