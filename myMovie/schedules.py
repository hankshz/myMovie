from apscheduler.schedulers.background import BackgroundScheduler

from myMovie import app
from myMovie import db
from myMovie import aria2Server
from myMovie.models import Download

def pollAria2():
    with app.app_context():
        downloads = Download.query.filter(Download.status != 'complete').all()
        for download in downloads:
            try:
                status = aria2Server.tellStatus(download.gid)
                download.status = status['status']
                download.downloadSpeed = status['downloadSpeed']
                download.completedLength = status['completedLength']
                download.totalLength = status['totalLength']
            except:
                download.status = 'error'
        db.session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(func=pollAria2, trigger='interval', seconds=1)
scheduler.start()
