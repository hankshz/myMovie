import hashlib
import os

from flask import render_template
from flask import abort
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename


from myMovie import app
from myMovie import db
from myMovie import apiManager
from myMovie.models import UploadedFile

for model in app.config['API_MODELS']:
    # TODO: enable pagination
    apiManager.create_api(model.modelClass, results_per_page =0, max_results_per_page = 0, methods=model.modelMethods, postprocessors=model.postProcessors)

@app.route('/fileUpload', methods=['POST'])
def fileUpload():
    def file_extension(filename):
        if '.' not in filename:
            return 'unknown'
        else:
            return filename.rsplit('.', 1)[1].lower()

    if 'file' in request.files:
        uploadedFile = request.files['file']
        if uploadedFile.filename != '':
            filename = secure_filename(uploadedFile.filename)
            extension = file_extension(filename)
            if extension not in ['torrent', 'metalink']:
                abort(409)
            content = uploadedFile.read()
            hashname = hashlib.md5(content).hexdigest()
            with open(os.path.join(app.config['UPLOAD_FOLDER'], hashname), 'wb') as f:
                f.write(content)
            dbFile = UploadedFile(originalName=filename, hashName=hashname, extension=extension)
            db.session.add(dbFile)
            db.session.commit()
            # Be consistent with REST API
            return jsonify({'id':dbFile.id, 'originalName':dbFile.originalName, 'hashName':dbFile.hashName, 'extension':dbFile.extension})
    abort(409)

# It's a single page app, so as long as it's not sent to /api, just let angular to handle it
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
