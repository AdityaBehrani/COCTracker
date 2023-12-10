from flask import Flask
from app.set_timeout import Timeout
from app.db import db
import app.db.schemas
from app.internal.constants import PUBLIC_IP_ADDRESS, DBNAME, USER, CONNECTION, PASSWORD
from app.internal.helpers.client_errors import method_not_allowed, not_found
from app.routes import player
from flask_migrate import Migrate
import sqlalchemy
from flask_smorest import Api
from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector, IPTypes


# Python Connector database connection function
def getconn():
    with Connector() as connector:
        conn = connector.connect(
            CONNECTION,
            "pymysql",
            user=USER,
            password=PASSWORD,
            db=DBNAME,
            ip_type= IPTypes.PUBLIC
        )
        return conn
    
app = Flask(__name__)  # noqa: F811

# configuration
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://"
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "creator": getconn
}

db.init_app(app)
Migrate(app, db)

app.url_map.strict_slashes = False

def exit_server():
    import os

    print("[debug] Exiting Server (inactive)")
    os._exit(4)

@app.route("/")
def main():
    return "GCloud app is working"

reset_timeout = Timeout(600, exit_server)
reset_timeout.start()

@app.before_request
def gate_check():
    reset_timeout.restart()
    pass


app.register_blueprint(player.router)

app.register_error_handler(404, not_found)
app.register_error_handler(405, method_not_allowed)