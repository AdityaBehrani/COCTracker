from app.internal.helpers.guard import guard
from ..schemas.player import Player

message = "Player does not exist"

def get_user_by_id(idx: str) -> Player:
    return guard(Player.query.filter(Player._id == idx).first(), message)

def get_user_by_clan(idx: str) -> Player:
    if not idx:
        return guard(None, message)
    return Player.query.filter(Player.clan_id == idx).all()

def search_by_townhall(level: int) -> list[Player]:
    if not level:
        return guard(None, message)
    return Player.query.filter(Player.townhall_level == level).all()
