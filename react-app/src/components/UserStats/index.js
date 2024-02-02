import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import MatchContainer from '../../MatchContainer';

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const matchIds = useSelector((state) => state.riot.match_ids);



  return (
    <div>
      <img src={`/dragontail-14.2.1/14.2.1/img/profileicon/${userInfo.profileIconId}.png`} />
      <span>lvl {userInfo.summonerLevel}</span>
      <h1>{userInfo.name}</h1>
    </div>
  )
};

export default UserStats;
