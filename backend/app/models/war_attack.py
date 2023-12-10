# pylint: disable=E0213
from typing import Optional
from app.models.base import CustomBase
from datetime import date

class WarAttackOut(CustomBase):
    _id: str
    player_id: str
    clan_id: str
    num_attack: int
    war_type: str
    stars: int
    percentage: int
    date: date