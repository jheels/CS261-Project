from time import sleep

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_login import LoginManager
from flask_socketio import SocketIO
from sqlalchemy.exc import OperationalError

db = SQLAlchemy()
mail = Mail()
socketio = SocketIO()


def create_app(config_object=None):
    """
    Creates and configures the Flask application.

    Returns:
        app (Flask): The configured Flask application.
    """
    app = Flask(__name__)
    if config_object is None:
        app.config['SECRET_KEY'] = "123"
        app.config['SECURITY_PASSWORD_SALT'] = "f36d7eda6b91ecaff1a9e7045529ec71"
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

        app.config['MAIL_USERNAME'] = 'donotreplysentify@gmail.com'
        app.config['MAIL_PASSWORD'] = 'uffc zybc kqga sebj'
        app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        app.config['MAIL_PORT'] = 465
        app.config['MAIL_USE_SSL'] = True
    else:
        app.config.from_object(config_object)

    db.init_app(app)
    mail.init_app(app)
    socketio.init_app(app)

    from .view import views 
    from . import models
    app.register_blueprint(views, url_prefix="/")
    
    resetdb = True
    if app.config['TESTING'] is True:
        resetdb = False
    if resetdb:
        with app.app_context():
            for _ in range(3):
                try:
                    db.drop_all()
                    db.create_all()
                    models.dbinit()
                    break
                except OperationalError:
                    print("Database initialisation failed, retrying...")
                    sleep(2)
            else:
                print("Unable to initialise database!")
                raise RuntimeError("Unable to initialise database!")

    login_manager = LoginManager()
    login_manager.login_view = 'views.login'
    login_manager.session_protection = "strong"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return models.User.query.get(int(user_id))

    return app
