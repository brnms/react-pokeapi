import React from 'react'

export default function PokemonList({ pokemon }) {
    return(
        <div className="container">
            {pokemon.map(p => (
                <div key={p}>
                    {p}
                </div>
            ))}
        </div>
    )
}