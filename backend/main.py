from set_env import setup_env

setup_env()

from app.main import app as core_app  # noqa: E402
from app.routes.player import create_player
from app.db.schemas.player import Player

def run_coreserver():
    core_app.run(host="0.0.0.0", debug=True, port=8080)
    

if __name__ == "__main__":
    run_coreserver()