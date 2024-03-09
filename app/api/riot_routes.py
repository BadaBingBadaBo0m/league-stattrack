from flask import Blueprint, jsonify, request
from flask_login import login_required
import os
from requests import get
RIOT_API_KEY = os.environ.get("RIOT_API_KEY")

riot_routes = Blueprint('riot', __name__)

def get_user_profile(gameName, tagLine):
  user_info = get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}", 
    headers={
      "X-Riot-Token": RIOT_API_KEY
    })
    
  user_info = user_info.json()
  
  if 'status' in user_info:
    return user_info

  user_profile = get(f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{user_info['puuid']}", 
    headers={
      "X-Riot-Token": RIOT_API_KEY
    })
  
  return user_profile.json()

def get_user_puuid(gameName, tagLine):
  user_info = get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}", 
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })

  return user_info.json()

def get_user_rank(summoner_id):
  user_rank = get(f"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}", 
    headers={
      "X-Riot-Token": RIOT_API_KEY
    })
  
  return user_rank.json()

def get_match_history_ids(puuid):
  match_ids = get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20",
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })

  return match_ids.json()

@riot_routes.route('/get_match_info', methods=["POST"])
def get_match_info():
  """
  Return a list of all information about 20 matches

  {
    "body": []
  }
  """
  match_list = request.get_json()
  print("fetched")
  
  matches = []

  for match in match_list:
    match_info_response = get(f"https://americas.api.riotgames.com/lol/match/v5/matches/{match}",
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })
    
    match_info = match_info_response.json()

    # if 'status' in match_info:
    #   print("RATE LIMIT EXCEDED ASKLDFHDASKLHFKSALDJFHASLKJFHSLAK")
    #   return {"error": match_info['status']['message'], "status_code": match_info['status']['status_code']}, match_info['status']['status_code']
    
    matches.append(match_info)

  return { "matches": matches }

@riot_routes.route('/get_user_info/<string:gameName>/<string:tagLine>')
def get_user_info(gameName, tagLine):
  user_profile = get_user_profile(gameName, tagLine)

  if 'status' in user_profile:
    return {"error": user_profile['status']['message']}, user_profile['status']['status_code']
  
  match_ids = get_match_history_ids(user_profile['puuid'])
  user_rank = get_user_rank(user_profile['id'])

  return {"user_profile": user_profile, "user_rank": user_rank, "match_ids": match_ids}
