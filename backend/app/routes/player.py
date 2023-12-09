from flask import Blueprint

from app.db.queries.player import (
    get_user_by_id,
    search_by_townhall
)
from app.models.player import PlayerOut

router = Blueprint("player", __name__, url_prefix="/players")


@router.get("/id/<player>/")
def user_details_by_id(idx: int):
    user_data = get_user_by_id(idx)
    model = PlayerOut.from_db(user_data)
    return {"player_data": model.dict()}

@router.get("/search")
def search_for_player_for_townhall(level: int):
    users = search_by_townhall(level)
    res = [PlayerOut.from_db(x).dict() for x in users]
    return res
