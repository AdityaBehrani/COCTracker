from flask import Blueprint, request, jsonify
from requests import delete
from sqlalchemy import JSON

from app.db.queries.player import (
    get_user_by_id,
    search_by_townhall
)
from app.db.mutations.player import (
    create_new_player,
    delete_old_player,
    increment_player_level,
    increment_player_townhall,
    change_player_clan
)
from app.models.player import PlayerOut
from app.db.schemas.player import Player


router = Blueprint("player", __name__, url_prefix="/players")


@router.get("/id/<_id>/")
def user_details_by_id(_id: str):
    user_data = get_user_by_id('#' + _id)
    model = PlayerOut.from_db(user_data)
    return {"player_data": model.dict()}

@router.get("/search/<int:th_level>")
def search_for_player_for_townhall(th_level: int):
    users = search_by_townhall(th_level)
    res = [PlayerOut.from_db(x).dict() for x in users]
    return res

@router.post("/create_player", strict_slashes=False)
def create_player():
    data = request.get_json()

    # Create a new player instance
    new_player = Player(
        _id=data['_id'],
        player_username=data['player_username'],
        player_level=data['player_level'],
        townhall_level=data['townhall_level'],
        clan_id=data.get('clan_id'),  # .get() will return None if 'clan_id' is not provided
        player_country=data['player_country']
    )
    
    js = create_new_player(new_player)
    return js

@router.route('/delete/<_id>')
def handle_delete_player(_id: str):
    return delete_old_player('#' + _id)

@router.route('/increment_level/<_id>')
def handle_increment_player_level(_id: str):
    return increment_player_level('#' + _id)

@router.route('/increment_townhall/<_id>')
def handle_increment_player_townhall(_id: str):
    return increment_player_townhall('#' + _id)

@router.post("/change_clan", strict_slashes=False)
def handle_change_clan():
    data = request.get_json()

    # get relavent data
    _id=data['_id']
    clan_id=data.get('clan_id')

    js = change_player_clan(_id, clan_id)
    return js