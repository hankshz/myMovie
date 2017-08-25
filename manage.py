#!/usr/bin/env python3

import argparse

from myMovie import db
from myMovie.models import Movie

def create_db():
    db.create_all()
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
