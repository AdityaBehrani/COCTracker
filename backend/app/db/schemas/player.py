import json
from sqlalchemy.dialects.postgresql import TEXT

from ..base import db


class Player(db.Model):
    # pylint: disable=E1101
    player_id: int = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    level: int = db.Column(db.Integer, nullable=False)
    townhall_level: int = db.Column(db.Integer, nullable=False)
    username: str = db.Column(TEXT, nullable=False)

    def __init__(
        self,
        player_id: int = None,
        level: int = None,
        townhall_level: int = None,
        username: str = None,
    ):
        self.player_id = player_id
        self.level = level
        self.townhall_level = townhall_level
        self.username = username

    @property
    def as_json(self):
        return {
            "player_id": self.player_id,
            "level": self.level,
            "townhall_level": self.townhall_level,
            "username": self.username
        }