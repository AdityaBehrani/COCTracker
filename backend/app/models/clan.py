# pylint: disable=E0213
from typing import Optional
from app.models.base import CustomBase

class ClanOut(CustomBase):
    _id: str
    clan_name: str
    clan_level: int
    clan_country: str