import React, { useState, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your API base URL

export const HttpRequestContext = createContext({});
export const HttpRequestProvider = (props) => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';
    const [pokemon, setPokemon] = useState(null);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemon = async () => {
        try {
            setLoading(true)
            setOptions([])
            const randomIndex = Math.floor(Math.random() * 151) + 1;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`);
            const fetchedPokemon = response.data;
            setPokemon(fetchedPokemon);
            // Fetch two more random Pokémon
            const otherPokemons = await Promise.all([
                fetchRandomPokemon(),
                fetchRandomPokemon(),
            ]);
            // Create options array and include the fetched Pokémon
            const pokemonOptions = [
                fetchedPokemon.name,
                ...otherPokemons.map(p => p.name),
            ];
            // Shuffle the options
            setOptions(shuffleArray(pokemonOptions));
        } catch (error) {
            console.error('Error fetching the Pokémon:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomPokemon = async () => {
        const randomIndex = Math.floor(Math.random() * 151) + 1;
        const response = await axios.get(`${baseURL}/${randomIndex}`);
        return response.data;
    };

    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    return (
        <HttpRequestContext.Provider
            value={{
                pokemon,
                fetchPokemon,
                loading,
                options
            }}
        >
            {props.children}
        </HttpRequestContext.Provider>
    );
};