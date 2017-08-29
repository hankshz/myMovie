import os

from apscheduler.schedulers.background import BackgroundScheduler
import sqlalchemy

from myMovie import app
from myMovie import db
from myMovie import aria2Server
from myMovie.models import Download
from myMovie.models import DownloadedFile

def pollAria2():
    with app.app_context():
        downloadsDB = Download.query.filter(Download.status != 'complete').all()
        for downloadDB in downloadsDB:
            try:
                status = aria2Server.tellStatus(downloadDB.gid)
                #print(status)
                downloadDB.completedLength = status['completedLength']
                downloadDB.totalLength = status['totalLength']
                if status['status'] != 'initializing' and status['totalLength'] == status['completedLength']:
                    # Hack to transit from active to complete manually
                    aria2Server.remove(downloadDB.gid)
                    downloadDB.status = 'complete'
                    downloadDB.downloadSpeed = 0
                else:
                    downloadDB.status = status['status']
                    downloadDB.downloadSpeed = status['downloadSpeed']
                for downloading in status['files']:
                    try:
                        downloadedFileDB = downloadDB.files.filter(DownloadedFile.index == downloading['index']).one()
                        downloadedFileDB.completedLength=downloading['completedLength']
                        downloadedFileDB.totalLength=downloading['length']
                    except sqlalchemy.orm.exc.NoResultFound:
                        downloadedFileDB = DownloadedFile(completedLength=downloading['completedLength'], totalLength=downloading['length'], index=downloading['index'], path=downloading['path'], name=os.path.basename(downloading['path']), download=downloadDB)
                        db.session.add(downloadedFileDB)
            except:
                downloadDB.status = 'error'
        db.session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(func=pollAria2, trigger='interval', seconds=5)
scheduler.start()
