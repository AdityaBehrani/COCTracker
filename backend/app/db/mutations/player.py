from flask import jsonify
from app.db import db
from app.db.mutations.util import commit
from app.db.queries.player import get_user_by_id
from app.db.schemas.player import Player
from app.db.schemas.clans import Clan
# pylint: disable=E1101

def _create(col, batch, return_json):
    js = col.as_json
    db.session.add(col)
    if not batch:
        commit()
    return col if not return_json else js

def create_new_player(data: Player, batch=False, return_json=True):
    return _create(data, batch, return_json)

def delete_old_player(player_id: str):
    # Find the player by _id
    player = Player.query.get(player_id)

    if player:
        # Player found, delete it
        db.session.delete(player)
        db.session.commit()
        
        connection = db.engine.raw_connection()
        try:
            cursor = connection.cursor()
                        
            # deleting clan if players of a clan drop to 0
            cursor.execute(
                """
                DELETE FROM clans
                WHERE _id NOT IN (
                SELECT DISTINCT clan_id
                FROM players
                WHERE clan_id IS NOT NULL
                );
                """
                )

            # Commit the transaction if necessary
            connection.commit()
            
        except Exception as e:
            connection.rollback()
        
        finally:
            cursor.close()
            connection.close()
            
        return jsonify({"message": "Player deleted successfully"}), 200
    else:
        # Player not found
        return jsonify({"message": "Player not found"}), 404

def increment_player_level(player_id: str):
    # Find the player by _id
    player = Player.query.get(player_id)

    if player:
        # Player found, increment level
        player.player_level += 1  # Increment by 1
        db.session.commit()
        return jsonify({"message": "Player level incremented successfully", "new_level": player.player_level}), 200
    else:
        # Player not found
        return jsonify({"message": "Player not found"}), 404
    
def increment_player_townhall(player_id: str):
    player = Player.query.get(player_id)

    if player:
        # Player found, increment townhall
        player.townhall_level += 1  # Increment by 1
        db.session.commit()
        return jsonify({"message": "Player townhall level incremented successfully", "new_level": player.townhall_level}), 200
    else:
        # Player not found
        return jsonify({"message": "Player not found"}), 404
    
def change_player_clan(_id: str, clan_id: str):
    player = Player.query.get(_id)
    clan = Clan.query.get(clan_id)
    
    if player and clan:
        player_sql = "UPDATE players SET clan_id = %s WHERE _id = %s;"
        
        # Obtain a connection
        connection = db.engine.raw_connection()
        try:
            cursor = connection.cursor()

            # Execute the prepared statement
            cursor.execute(player_sql, (clan_id, _id))
            
            # deleting clan if players drop to 0
            cursor.execute(
                """
                DELETE FROM clans
                WHERE _id NOT IN (
                SELECT DISTINCT clan_id
                FROM players
                WHERE clan_id IS NOT NULL
                );
                """
                )

            # Commit the transaction if necessary
            connection.commit()
            
        except Exception as e:
            connection.rollback()
            return jsonify({"message": "Player clan change failed!"}), 404
        
        finally:
            # Ensure resources are released
            cursor.close()
            connection.close()
            
            return jsonify({"message": "Player clan changed successfully", "new_clan": clan_id}), 200

    elif not player:
        # Player not found
        return jsonify({"message": "Player not found"}), 404
    
    elif not clan:
        # Clan not found
        return jsonify({"message": "Clan not found"}), 404
    
    else:
        # Diff Issue not found
        return jsonify({"message": "Clan or Player not found"}), 404
    