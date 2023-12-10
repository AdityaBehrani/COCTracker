from app.internal.helpers.guard import guard
from app.db.schemas.ERROR import ROUTE_ERROR
from ..schemas.clans import Clan
import json

message = "Clan does not exist"

def get_clan_by_id(idx: str) -> Clan:
    # try:
    #     res = guard(Clan.query.filter(Clan._id == idx).first(), message)
    #     return res
    # except Exception as e:
    #     return ROUTE_ERROR(message=message)
    return guard(Clan.query.filter(Clan._id == idx).first(), message)

def search_by_country(country: str) -> list[Clan]:
    if not country:
        return guard(None, message)
    return Clan.query.filter(Clan.clan_country == country).all()
