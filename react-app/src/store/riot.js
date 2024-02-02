const GET_USER_INFO = 'riot/GET_USER_INFO';

const getMatches = (matches) => ({
  type: GET_USER_INFO,
  payload: matches
});

const initialState = { summonerName: null, riotID: null, match_ids: null };

export const getSummonerMatches = (gameName, tagLine) => async (dispatch) => {
  const response = await fetch(`/api/riot/get_user_info/${gameName}/${tagLine}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getMatches(data));
  }
}
  ;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      // return { ...state, matchIds: action.payload };
      return {
        ...state,
        summonerName: action.payload.user_info.gameName,
        riotID: action.payload.user_info.tagLine,
        match_ids: action.payload.match_ids
      }
    default:
      return state;
  }
}
