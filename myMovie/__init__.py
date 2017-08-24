from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager

app = Flask(__name__)
app.config.from_object('myMovie.settings')

db = SQLAlchemy(app)
apiManager = APIManager(app, flask_sqlalchemy_db=db)

import myMovie.models
import myMovie.controllers
