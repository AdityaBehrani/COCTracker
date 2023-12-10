from flask import Blueprint

from app.db.queries.player import (
    get_user_by_id,
    search_by_townhall
)
from app.models.player import PlayerOut

router = Blueprint("player", __name__, url_prefix="/players")


@router.get("/id/<int:player_id>/")
def user_details_by_id(player_id: int):
    user_data = get_user_by_id(player_id)
    model = PlayerOut.from_db(user_data)
    return {"player_data": model.dict()}

@router.get("/search/<int:th_level>")
def search_for_player_for_townhall(th_level: int):
    users = search_by_townhall(th_level)
    res = [PlayerOut.from_db(x).dict() for x in users]
    return res
