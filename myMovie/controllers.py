import hashlib
import os

from flask import render_template
from flask import abort
from flask import request
from werkzeug.utils import secure_filename


from myMovie import app
from myMovie import apiManager

for model in app.config['API_MODELS']:
    apiManager.create_api(model.modelClass, methods=model.modelMethods)

@app.route('/fileUpload', methods=['POST'])
def fileUpload():
    if 'file' in request.files:
        uploadedFile = request.files['file']
        if uploadedFile.filename != '':
            filename = secure_filename(uploadedFile.filename)
            hashname = hashlib.md5(uploadedFile.read()).hexdigest()
            uploadedFile.save(os.path.join(app.config['UPLOAD_FOLDER'], hashname))
            return 'hello'
    abort(409)

# It's a single page app, so as long as it's not sent to /api, just let angular to handle it
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
