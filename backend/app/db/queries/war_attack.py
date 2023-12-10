from app.internal.helpers.guard import guard
from ..schemas.war_attack import WarAttack

message_player = "Player does not exist"
message_clan = "Clan does not exist"
message_war = "War does not exist"

def get_attacks_by_clan_id(idx: str) -> [WarAttack]:
    if not idx:
        return guard(None, message_player)
    return WarAttack.query.filter(WarAttack.clan_id == idx).all()

def get_attacks_by_player_id(idx: str) -> [WarAttack]:
    if not idx:
        return guard(None, message_clan)
    return WarAttack.query.filter(WarAttack.player_id == idx).all()

def get_attacks_by_war_id(idx: str) -> [WarAttack]:
    if not idx:
        return guard(None, message_war)
    return WarAttack.query.filter(WarAttack._id == idx).all()


