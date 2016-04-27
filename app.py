# from __future__ import print_function # In python 2.7
# import sys
from flask import Flask, request, render_template, redirect, url_for, flash
import os
import psycopg2
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)



class Submission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    winner = db.Column(db.String(80))

    def __init__(self, first_name, last_name, winner):
        self.first_name = first_name
        self.last_name = last_name
        self.winner = winner

    def __repr__(self):
        return '<Name %r>' % self.first_name

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['GET', 'POST'])
def submit():
	# print('Hey!', file=sys.stderr)
	if request.method == 'POST':
		# print(request.form['1a'], file=sys.stderr)
		return render_template("success.html")
	# print('Hello world!', file=sys.stderr)
	return render_template('submit.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

if __name__ == "__main__":
	# app.debug = True
	app.run()