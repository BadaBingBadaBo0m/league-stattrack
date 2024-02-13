import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMatches, getSummonerInfo } from '../../store/riot';
import { useParams } from 'react-router-dom'
import MatchList from '../MatchList';

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userProfile);
  const matchIds = useSelector((state) => state.riot.match_ids);
  const matchData = useSelector((state) => state.riot.match_data);
  const { gameName } = useParams();
  const { tagLine } = useParams();
  const dispatch = useDispatch();

  if (!userInfo) {
    dispatch(getSummonerInfo(gameName, tagLine))
  }

  useEffect(() => {
    dispatch(getMatches(matchIds));
  }, [userInfo])

  if (!userInfo) return <div>Loading userInfo</div>
  if (!matchIds) return <div>Loading matchIds</div>
  if (!matchData || !matchData.length) return <div>Loading matchData</div>

  return (
    <section>
      <div>
        <img src={`/dragontail-14.2.1/14.2.1/img/profileicon/${userInfo.profileIconId}.png`} />
        <span>lvl {userInfo.summonerLevel}</span>
        <h1>{userInfo.name}</h1>
      </div>

      {/* <button onClick={e => console.log(gameName)}>test</button> */}

      <div id='match-list-container'>
        <MatchList matchData={matchData} />
      </div>

    </section>
  )
};

export default UserStats;
