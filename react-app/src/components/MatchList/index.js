import React from 'react';
import MatchContainer from '../MatchContainer';

const MatchList = ({ matchData }) => {

  if (!matchData) return <h1>Loading</h1>

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
