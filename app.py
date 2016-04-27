from flask import Flask
from flask import render_template
from flask import redirect, url_for
from flask.ext.mysqldb import MySQL
import os
import sys
import urlparse

mysql = MySQL()
urlparse.uses_netloc.append('mysql')
url = urlparse.urlparse(os.environ['DATABASE_URL'])
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['MYSQL_DATABASE_USER'] = url.username
app.config['MYSQL_DATABASE_PASSWORD'] = url.password
app.config['MYSQL_DATABASE_DB'] = url.path[1:]
app.config['MYSQL_DATABASE_HOST'] = url.hostname
mysql.init_app(app)

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