from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager

from .pyaria2 import PyAria2

app = Flask(__name__)
app.config.from_object('myMovie.settings')

aria2Server = PyAria2()

db = SQLAlchemy(app)
apiManager = APIManager(app, flask_sqlalchemy_db=db)

import myMovie.models
import myMovie.controllers
import myMovie.schedules
