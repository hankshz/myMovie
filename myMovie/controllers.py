from flask import render_template
from flask import abort

from myMovie import app
from myMovie import apiManager

for model in app.config['API_MODELS']:
    apiManager.create_api(model.modelClass, methods=model.modelMethods)

# It's a single page app, so as long as it's not sent to /api, just let angular to handle it
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
