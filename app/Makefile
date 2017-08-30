setup:
	sudo apt-get update
	sudo apt-get install -y aria2 python3-pip nginx
	sudo pip3 install -r requirements.txt

clean:
	./manage.py delete_data
	./manage.py delete_db
	./manage.py create_db

production:
	sudo ln -sf $(shell pwd)/site-myMovie /etc/nginx/sites-enabled/default
	sudo service nginx restart
	uwsgi --ini myMovie.ini
