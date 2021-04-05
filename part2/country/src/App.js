import React,{useState,useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const baseUrl = "https://restcountries.eu/rest/v2/name/";

  const [searchKey,setSearchKey] = useState("China");//搜索关键词

  const searchHook = () => {

    if(searchKey.length === 0) {
      return;
    }

    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchKey}`)
      .then(response => {
        console.log("data: ",response.data);
      })
  };

  //第二个参数
  useEffect(searchHook,[searchKey]);

  const handleSearchKeyChange = (event) => {
    const keyWord = event.target.value;
    console.log("searchKey: ",keyWord);
    setSearchKey(keyWord);
  }


  return(
    <div>
      <div>
        find countries:
          <input value={searchKey} onChange={handleSearchKeyChange}/>
      </div>
    </div>
  );
}


export default App;
