import React,{useState,useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const baseUrl = "https://restcountries.eu/rest/v2/name/";

  const [searchKey,setSearchKey] = useState("China");//搜索关键词

  const [data,doSearch] = useApi(baseUrl.concat(searchKey),[]);

  const handleSearchKeyChange = (event) => {
    const keyWord = event.target.value;
    console.log("searchKey: ",keyWord);
    setSearchKey(keyWord);
  }

  const handleSearch = () => {
    if(searchKey.length === 0) {
      return;
    }
    doSearch(baseUrl.concat(searchKey));
  }


  return(
    <div>
      <div>
        find countries:
          <input value={searchKey} onChange={handleSearchKeyChange}/>
          <button onClick={handleSearch}>Search</button>
      </div>
      <CountryList data={data}/>
    </div>
  );
}

const CountryList = ({data}) => {
  if(data.length > 10) {
    return (<div>Too many matches,specify another filter</div>);
  } else if(data.length > 1) {
    return (
      <div>
        <ul>
          {data.map((it) => 
            <li key={it.numericCode}>{it.name}</li>)}
        </ul>
      </div>
    );
  } else if(data.length === 1){
    return <CountryItem data={data[0]}/>
  } else {
    return(<div>No matches.</div>)
  }
  
}

const CountryItem = ({data}) => {
  return(
    <div>
      <h3>{data.name}</h3>
      <p>capital:{data.capital}</p>
      <p>population:{data.population}</p>
    </div>
  )
}

const useApi = (initialUrl,initialData) => {
  
  const [url ,setUrl] = useState(initialUrl);
  const [result ,setResult] = useState(initialData);

  useEffect(()=> {
    const fetchData = async() => {
      const response = await axios.get(url);
      console.log('result: ',response.data);
      setResult(response.data);
    }

    fetchData();
  },[url]);

  return [result,setUrl];
}


export default App;
