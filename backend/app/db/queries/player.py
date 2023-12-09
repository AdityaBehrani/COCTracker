from app.internal.helpers.guard import guard
from ..schemas.player import Player
from sqlalchemy import or_

message = "Player does not exist"

def get_user_by_id(idx: int) -> Player:
    return guard(Player.query.filter_by(player_id=idx).first(), message)


def search_by_townhall(level: int) -> list[Player]:
    if not level:
        return guard(None, message)
    return Player.query.filter(Player.townhall_level == level).all()
