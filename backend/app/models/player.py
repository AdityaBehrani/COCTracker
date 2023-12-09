# pylint: disable=E0213
from app.models.base import CustomBase

class PlayerOut(CustomBase):
    player_id: int
    level: int
    townhall_level: int
    username: str
