from flask import Flask
from flask import render_template
from flask import redirect, url_for
import os
import psycopg2
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
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

@app.route('/submit')
def submit():
	return render_template('submit.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

if __name__ == "__main__":
	app.run()