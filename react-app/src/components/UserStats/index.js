import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMatches } from '../../store/riot';
import MatchContainer from '../../MatchContainer';

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const matchIds = useSelector((state) => state.riot.match_ids);
  const dispatch = useDispatch();

  dispatch(getMatches(matchIds));

  return (
    <div>
      <img src={`/dragontail-14.2.1/14.2.1/img/profileicon/${userInfo.profileIconId}.png`} />
      <span>lvl {userInfo.summonerLevel}</span>
      <h1>{userInfo.name}</h1>
    </div>
  )
};

export default UserStats;
