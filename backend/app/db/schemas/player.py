import json
from sqlalchemy.dialects.postgresql import TEXT

from ..base import db


class Player(db.Model):
    __tablename__ = 'players'
    # pylint: disable=E1101
    _id: str = db.Column(TEXT, unique=True, nullable=False, primary_key=True)
    player_username: str = db.Column(TEXT, nullable=False)
    player_level: int = db.Column(db.Integer, nullable=False)
    townhall_level: int = db.Column(db.Integer, nullable=False)
    clan_id: str = db.Column(TEXT, unique=True, nullable=True)
    player_country: str = db.Column(TEXT, nullable=False)
    
    
    def __init__(
        self,
        _id = None,
        player_username = None,
        player_level = None,
        townhall_level = None,
        clan_id = None,
        player_country = None,
    ):
        self._id = _id
        self.player_username = player_username
        self.player_level = player_level
        self.townhall_level = townhall_level
        self.clan_id = clan_id
        self.player_country = player_country

    @property
    def as_json(self):
        return {
            "_id": self._id,
            "player_username": self.player_username,
            "player_level": self.player_level,
            "townhall_level": self.townhall_level,
            "clan_id": self.clan_id,
            "player_country": self.player_country
        }