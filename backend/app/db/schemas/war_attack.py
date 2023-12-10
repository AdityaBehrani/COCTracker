import json
from sqlalchemy.dialects.postgresql import TEXT, DATE
from sqlalchemy.sql import func
from ..base import db

class WarAttack(db.Model):
    __tablename__ = 'war_attacks'
    # pylint: disable=E1101
    _id: str = db.Column(TEXT, unique=True, nullable=False, primary_key=True)
    player_id: str = db.Column(TEXT, db.ForeignKey('players._id'), nullable=False)
    clan_id: str = db.Column(TEXT, db.ForeignKey('clans._id'), nullable=False)
    num_attack: int = db.Column(db.Integer, nullable=False)
    war_type: str = db.Column(TEXT, nullable=False)
    stars: int = db.Column(db.Integer, nullable=False)
    percentage: int = db.Column(db.Integer, nullable=False)
    date: str = db.Column(DATE, default=func.now(), nullable=False)

    def __init__(
        self,
        _id=None,
        player_id=None,
        clan_id=None,
        num_attack=None,
        war_type=None,
        stars=None,
        percentage=None,
        date=None
    ):
        self._id = _id
        self.player_id = player_id
        self.clan_id = clan_id
        self.num_attack = num_attack
        self.war_type = war_type
        self.stars = stars
        self.percentage = percentage
        self.date = date

    @property
    def as_json(self):
        return {
            "_id": self._id,
            "player_id": self.player_id,
            "clan_id": self.clan_id,
            "num_attack": self.num_attack,
            "war_type": self.war_type,
            "stars": self.stars,
            "percentage": self.percentage,
            "date": self.date.isoformat() if self.date else None
        }