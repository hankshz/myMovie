import collections
from datetime import datetime
import os

from myMovie import app
from myMovie import aria2Server
from myMovie import db

APIModel = collections.namedtuple('APIModel', ['modelClass', 'modelMethods', 'postProcessors'])

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

class Download(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gid = db.Column(db.String(16), nullable=False)
    status = db.Column(db.String(16))
    action = db.Column(db.String(16))
    downloadSpeed = db.Column(db.String(16))
    completedLength = db.Column(db.String(16))
    totalLength = db.Column(db.String(16))
    taskId = db.Column(db.Integer, db.ForeignKey('task.id'))
    task = db.relationship(Task, backref=db.backref('downloads'))

class DownloadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    completedLength = db.Column(db.String(16))
    totalLength = db.Column(db.String(16))
    index = db.Column(db.String(16))
    path = db.Column(db.String(80))
    name = db.Column(db.String(80))
    downloadId = db.Column(db.Integer, db.ForeignKey('download.id'))
    download = db.relationship(Download, backref=db.backref('files', lazy='dynamic'))

def create_downloads(result):
    task = Task.query.filter_by(id=result['id']).one()
    src = os.path.join(app.config['UPLOAD_FOLDER'], task.uploadedFile.hashName)
    dst = os.path.join(app.config['DOWNLOAD_FOLDER'], task.uploadedFile.hashName)
    if task.uploadedFile.extension == 'torrent':
        gid = aria2Server.addTorrent(src, uris=[], options={'rpc-save-upload-metadata':False, 'dir':dst})
        download = Download(gid=gid, status='initializing')
        db.session.add(download)
        task.downloads.append(download)
    elif task.uploadedFile.extension == 'metalink':
        gids = aria2Server.addMetalink(src, options={'rpc-save-upload-metadata':False, 'dir':dst})
        print(gids)
        for gid in gids:
            download = Download(gid=gid, status='initializing')
            db.session.add(download)
            task.downloads.append(download)
    db.session.commit()

app.config['API_MODELS'] = [
    APIModel(modelClass=Movie, modelMethods=['GET'], postProcessors={}),
    APIModel(modelClass=UploadedFile, modelMethods=['GET'], postProcessors={}),
    APIModel(modelClass=Task, modelMethods=['GET', 'POST'], postProcessors={'POST': [create_downloads]}),
    APIModel(modelClass=Download, modelMethods=['GET'], postProcessors={}),
]
