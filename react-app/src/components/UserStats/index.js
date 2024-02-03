import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMatches } from '../../store/riot';
import MatchList from '../MatchList';

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const matchIds = useSelector((state) => state.riot.match_ids);
  const matchData = useSelector((state) => state.riot.match_data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatches(matchIds));
  }, [])
  if (matchData) console.log(matchData.length)
  return (
    <section>
      <div>
        <img src={`/dragontail-14.2.1/14.2.1/img/profileicon/${userInfo.profileIconId}.png`} />
        <span>lvl {userInfo.summonerLevel}</span>
        <h1>{userInfo.name}</h1>
      </div>

      <MatchList matchData={matchData} />

    </section>
  )
};

export default UserStats;
