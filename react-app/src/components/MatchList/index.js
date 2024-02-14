import React from 'react';
import MatchContainer from '../MatchContainer';

const MatchList = ({ matchData, errors }) => {

  // if (!matchData) return <h1>Loading</h1>
  if (errors?.error) return <div>{errors.error}</div>
  if (!matchData || !matchData.length) return <div>Loading matchData</div>

  return (
    <div>
      <h1>Match list</h1>
      {matchData.map(match => (
        <MatchContainer matchData={match} />
      ))}
    </div>
  )
};

export default MatchList;
