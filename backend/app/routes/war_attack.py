from flask import Blueprint, request, jsonify
from requests import delete
from sqlalchemy import JSON

from app.db.queries.war_attack import (
    get_attacks_by_player_id,
    get_attacks_by_clan_id,
    get_attacks_by_war_id
)
from app.models.war_attack import WarAttackOut

router = Blueprint("attack", __name__, url_prefix="/attacks")


@router.get("/id/war/<_id>/")
def handle_get_attacks_by_war_id(_id: str):
    attacks = get_attacks_by_war_id('#' + _id)
    res = [WarAttackOut.from_db(x).dict() for x in attacks]
    return res
    

@router.get("/id/player/<_id>/")
def handle_get_attacks_by_player_id(_id: str):    
    attacks = get_attacks_by_player_id('#' + _id)
    res = [WarAttackOut.from_db(x).dict() for x in attacks]
    return res

@router.get("/id/clan/<_id>/")
def handle_get_attacks_by_clan_id(_id: str):
    attacks = get_attacks_by_clan_id('#' + _id)
    res = [WarAttackOut.from_db(x).dict() for x in attacks]
    return res
