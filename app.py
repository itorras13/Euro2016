from flask import Flask
from flask import render_template
from flask import redirect, url_for
import os
import psycopg2
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit')
def submit():
	print mysql
	return render_template('submit.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

if __name__ == "__main__":
	app.run()