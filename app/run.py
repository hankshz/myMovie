#!/usr/bin/env python3

from myMovie import app

def run(host='0.0.0.0', port=8080):
    app.run(host=host, port=port)

if __name__ == '__main__':
    run()
