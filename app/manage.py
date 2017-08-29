#!/usr/bin/env python3

import argparse
import os
import subprocess

from myMovie import db
from myMovie.models import *

def create_db():
    db.create_all()

def drop_db():
    db.drop_all()

def delete_data():
    dirPath = os.path.dirname(os.path.realpath(__file__))
    subprocess.call('rm -rf {}/*'.format(os.path.join(dirPath, 'data', 'upload')), shell=True)
    subprocess.call('rm -rf {}/*'.format(os.path.join(dirPath, 'data', 'download')), shell=True)

def main():
    parser = argparse.ArgumentParser(description='Manage tool.')
    parser.add_argument('command', help='the name of the command you want to run')
    args = parser.parse_args()

    if args.command == 'create_db':
        create_db()
    elif args.command == 'delete_db':
        drop_db()
    elif args.command == 'delete_data':
        delete_data()

if __name__ == '__main__':
    main()
