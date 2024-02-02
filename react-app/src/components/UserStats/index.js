import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const UserStats = () => {
  const userInfo = useSelector((state) => state.riot.userInfo);
  const matchIds = useSelector((state) => state.riot.match_ids);

  return (
    <div>
      <h1>{userInfo.gameName}</h1>
    </div>
  )
};

export default UserStats;
