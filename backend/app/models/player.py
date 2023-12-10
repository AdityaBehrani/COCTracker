# pylint: disable=E0213
from typing import Optional
from app.models.base import CustomBase

class PlayerOut(CustomBase):
    _id: str
    player_username: str
    player_level: int
    townhall_level: int
    clan_id: Optional[str]
    player_country: str
