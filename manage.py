#!/usr/bin/env python3

import argparse

from myMovie import db
from myMovie.models import Movie

def create_db():
    db.create_all()
    movie = Movie(title='Sample1', location='http://static.videogular.com/assets/videos/videogular.mp4')
    db.session.add(movie)
    movie = Movie(title='Sample2', location='http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4')
    db.session.add(movie)
    for i in range(5):
        movie = Movie(title='myTitle{}'.format(i), location='myLocation{}'.format(i))
        db.session.add(movie)
    db.session.commit()

def drop_db():
    db.drop_all()

def main():
    parser = argparse.ArgumentParser(description='Manage tool.')
    parser.add_argument('command', help='the name of the command you want to run')
    args = parser.parse_args()

    if args.command == 'create_db':
        create_db()
    elif args.command == 'delete_db':
        drop_db()

if __name__ == '__main__':
    main()
