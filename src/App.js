import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([]) 
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.prev)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()

  }, [currentPageUrl])

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setcurrentPageUrl(prevPageUrl)
  }

  if(loading) return 'Loading...'

  

  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl? gotoPrevPage: null}
      />
    </div>
  );
}

export default App;
