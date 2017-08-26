import collections
from datetime import datetime

from myMovie import app
from myMovie import db

APIModel = collections.namedtuple('APIModel', ['modelClass', 'modelMethods'])

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    location = db.Column(db.String(80))

class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    originalName = db.Column(db.String(80))
    hashName = db.Column(db.String(80))
    extension = db.Column(db.String(80))

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    createdTime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    uploadedFileId = db.Column(db.Integer, db.ForeignKey('uploaded_file.id'))
    uploadedFile = db.relationship(UploadedFile, backref=db.backref('tasks'))

app.config['API_MODELS'] = [
    APIModel(modelClass=Movie, modelMethods=['GET']),
    APIModel(modelClass=UploadedFile, modelMethods=['GET']),
    APIModel(modelClass=Task, modelMethods=['GET', 'POST']),
]
