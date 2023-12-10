from flask import Blueprint, request, jsonify
from requests import delete
from sqlalchemy import JSON

from app.db.queries.clans import (
    get_clan_by_id,
    search_by_country
)
from app.models.clan import ClanOut

router = Blueprint("clan", __name__, url_prefix="/clans")

@router.get("/id/<_id>/")
def clan_details_by_id(_id: str):
    user_data = get_clan_by_id('#' + _id)
    model = ClanOut.from_db(user_data)
    return {"clan_data": model.dict()}

@router.get("/search/<country>")
def search_for_clans_by_country(country: str):
    country = country.replace("_", " ")
    clans = search_by_country(country)
    res = [ClanOut.from_db(x).dict() for x in clans]
    return res
