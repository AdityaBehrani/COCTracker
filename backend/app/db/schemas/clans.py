import json
from sqlalchemy.dialects.postgresql import TEXT
from ..base import db

class Clan(db.Model):
    __tablename__ = 'clans'
    # pylint: disable=E1101
    _id: str = db.Column(TEXT, unique=True, nullable=False, primary_key=True)
    clan_name: str = db.Column(TEXT, nullable=False)
    clan_level: int = db.Column(db.Integer, nullable=False)
    clan_country: str = db.Column(TEXT, nullable=False)

    def __init__(
        self,
        _id=None,
        clan_name=None,
        clan_level=None,
        clan_country=None,
    ):
        self._id = _id
        self.clan_name = clan_name
        self.clan_level = clan_level
        self.clan_country = clan_country

    @property
    def as_json(self):
        return {
            "_id": self._id,
            "clan_name": self.clan_name,
            "clan_level": self.clan_level,
            "clan_country": self.clan_country
        }
