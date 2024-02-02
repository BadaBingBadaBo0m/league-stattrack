const GET_USER_INFO = 'riot/GET_USER_INFO';

const getUserInfo = (matches) => ({
  type: GET_USER_INFO,
  payload: matches
});

const initialState = { userProfile: null, match_ids: null };

export const getSummonerInfo = (gameName, tagLine) => async (dispatch) => {
  const response = await fetch(`/api/riot/get_user_info/${gameName}/${tagLine}`);

  if (response.ok) {
    const data = await response.json();
    return dispatch(getUserInfo(data));
  }

  return response
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      // return { ...state, matchIds: action.payload };
      return {
        ...state,
        userProfile: action.payload.user_profile,
        match_ids: action.payload.match_ids
      }
    default:
      return state;
  }
}
