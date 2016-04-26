from flask import Flask
from flask import render_template
from flask import redirect, url_for

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run()