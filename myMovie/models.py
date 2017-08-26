import collections

from myMovie import app
from myMovie import db

APIModel = collections.namedtuple('APIModel', ['modelClass', 'modelMethods'])

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    location = db.Column(db.String(80))

class Download(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    downloadType = db.Column(db.String(80))

app.config['API_MODELS'] = [
    APIModel(modelClass=Movie, modelMethods=['GET'])
]
