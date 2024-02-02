from flask import Blueprint, jsonify
from flask_login import login_required
import os
from requests import get
RIOT_API_KEY = os.environ.get("RIOT_API_KEY")

riot_routes = Blueprint('riot', __name__)

def get_user_puuid(gameName, tagLine):
  user_info = get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}", 
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })

  return user_info.json()

def get_match_history_ids(puuid):
  match_ids = get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20",
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })

  return match_ids.json()

def get_match_info(match_ids):
  """
  Return a list of all information about 20 matches
  """
  matches = []

  for match in match_ids:
    match_info = get(f"https://americas.api.riotgames.com/lol/match/v5/matches/{match}",
    headers={
    "X-Riot-Token": RIOT_API_KEY
  })
    
    matches.append(match_info.json())
  # match_info = get(f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}",
  #   headers={
  #   "X-Riot-Token": RIOT_API_KEY
  # })

  return matches

@riot_routes.route('/get_user_puuid/<string:gameName>/<string:tagLine>')
@login_required
def send_puuid(gameName, tagLine):
  user_info = get_user_puuid(gameName, tagLine)

  return {"puuid": user_info['puuid']}

@riot_routes.route('/get_user_info/<string:gameName>/<string:tagLine>')
def get_user_info(gameName, tagLine):
  user_info = get_user_puuid(gameName, tagLine)
  match_ids = get_match_history_ids(user_info['puuid'])
  # match_info = get_match_info(match_ids)

  return {"user_info": user_info, "match_ids": match_ids}

@riot_routes.route('/get_match_info/<string:match_id>')
def send_match_info(match_id):
  match_info = get_match_info(match_id)

  return match_info
