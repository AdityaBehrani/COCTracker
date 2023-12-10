import json

from app.db import db
from app.db.mutations.util import commit
from app.db.queries.player import get_user_by_id
from app.db.schemas import Player
from app.models.player import PlayerOut

# pylint: disable=E1101


def _create(col, batch, return_json):
    js = col.as_json
    db.session.add(col)
    if not batch:
        commit()
    return col if not return_json else js


def create_player(user_model: PlayerOut, batch=False, return_json=False):
    u = user_model
    col = Player(
        player_id = u.player_id,
        level = u.level,
        townhall_level = u.townhall_level,
        username = u.username
    )
    
    return _create(col, batch, return_json)