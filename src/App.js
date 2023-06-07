import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
// import InputGroup from "../components/Filter/category/InputGroup";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

const Home = () => {
  

    let [fetchedData, setFetchedData] = useState([]);
    let { info, results } = fetchedData;
    let [pageNumber, setPageNumber] = useState('1');
    let [search, setSearch] = useState("");
    let [status, setStatus] = useState("");
    let [gender, setGender] = useState("");
    let [species, setSpecies] = useState("");
  
    let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
  
  
    useEffect(() => {
      (async () => {
        let data = await fetch(api).then((res) => res.json());
        setFetchedData(data);
      })();
    }, [api]);
  
    return (
      <div className="App">
    <h1 className="text-center mb-3">Characters</h1>
    <Search setSearch={setSearch} setPageNumber={setPageNumber} />
    <div className="container">
    <div className="row">
    <Filter
      pageNumber={pageNumber}
      status={status}
      setStatus={setStatus}
      setGender={setGender}
      setSpecies={setSpecies}
      setPageNumber={setPageNumber}
    />
      <div className="col-lg-8 col-12">
        <div className="row">
        <Card results={results} />
        </div>
      </div>
    </div>
    </div>
    <Pagination info={info} pageNumber={pageNumber} setPageNumber={setPageNumber} />
  </div>
    );
  }

  function App() {
    return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/episodes" element={<Episodes />} />

            <Route path="/location" element={<Location />} />
          </Routes>
      </Router>
    );
  }

export default App;
