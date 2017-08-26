import os
rootDir = os.path.dirname(os.path.realpath(__file__))
dataDir = os.path.join(rootDir, '..', 'data')

DEBUG = True
SECRET_KEY = 'magickey'
SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(dataDir, 'db', 'myMovie.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = os.path.join(dataDir, 'upload')
