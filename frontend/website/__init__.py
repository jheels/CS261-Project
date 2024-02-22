from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_login import LoginManager


db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "123"
    app.config['SECURITY_PASSWORD_SALT'] = "f36d7eda6b91ecaff1a9e7045529ec71" # random hash idk maybe we can be more secure
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    app.config['MAIL_USERNAME'] = 'donotreplysentify@gmail.com'
    app.config['MAIL_PASSWORD'] = 'uffc zybc kqga sebj'
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True

    db.init_app(app)   
    mail.init_app(app)
        
    #registering blueprints 
    from .view import views 
    app.register_blueprint(views, url_prefix="/")
    
    from .models import User, Notification, Follow, Sector, Source, Company, Article
    with app.app_context():
        db.drop_all()
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'views.login'
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
       
    return app
