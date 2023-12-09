from flask import Flask
from floodgate.flask import guard
from app.set_timeout import Timeout
from app.db import db
import app.db.schemas
from app.internal.constants import DATABASE_URL
from app.internal.helpers import ip_resolver
from app.internal.helpers.client_errors import method_not_allowed, not_found
from app.routes import player
from flask_migrate import Migrate

app = Flask(__name__)  # noqa: F811

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

Migrate(app, db)

app.url_map.strict_slashes = False


def exit_server():
    import os

    print("[debug] Exiting Server (inactive)")
    os._exit(4)


reset_timeout = Timeout(600, exit_server)
reset_timeout.start()

@app.before_request
def gate_check():
    reset_timeout.restart()
    pass


app.register_blueprint(player.router)

app.register_error_handler(404, not_found)
app.register_error_handler(405, method_not_allowed)