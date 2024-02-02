import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSummonerMatches, useSelector } from '../../store/riot';

const SummonerSearch = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const checkErrors = () => {
    let errorObj = {};

    if (!gameName) {
      errorObj['gameName'] = 'Username required';
    }

    if (gameName.length > 20) {
      errorObj['gameName'] = 'Username must be 20 characters or less';
    }

    if (!tagLine) {
      errorObj['tagLine'] = 'RiotID required';
    }

    if (Object.keys(errorObj).length) {
      setErrors(errorObj);
      return true;
    }

    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkErrors()) {
      console.log('submitting', gameName, tagLine);
      dispatch(getSummonerMatches(gameName, tagLine));
    }
  }

  return (
    <form>

      <label>Username {errors.gameName && <span className='errors'>{errors.gameName}</span>}</label>
      <input
        className='summoner-search-input'
        type='text'
        placeholder='Enter your user name'
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />

      <label>RiotID {errors.tagLine && <span className='errors'>{errors.tagLine}</span>}</label>
      <input
        className='riotID-input'
        type='text'
        value={tagLine}
        placeholer="#0000"
        onChange={(e) => setTagLine(e.target.value)}
      />

      <button id='summoner-search-button' type='submit' onClick={handleSubmit} >Search</button>
    </form>
  )
};

export default SummonerSearch;
