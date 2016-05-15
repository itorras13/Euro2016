# from __future__ import print_function # In python 2.7
# import sys
from flask import Flask, request, render_template, redirect, url_for, flash
import os
import psycopg2
from flask.ext.sqlalchemy import SQLAlchemy
from datetime import datetime
import socket
import sendgrid

#SendGrid
sg = sendgrid.SendGridClient(os.environ['SENDGRID_KEY'])

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
from models import Submission


@app.route('/')
def index():
	submissions = get_submissions("index")
	return render_template('index.html', submissions=submissions, modal="none")

# @app.route('/show', defaults={'email': None})
@app.route('/show/<email>')
def show(email):
	submissions = get_submissions("show")
	names_and_emails = []
	emails_used = []
	name = ""
	for sub in submissions:
		temp = {}
		if sub.email not in emails_used:
			emails_used.append(sub.email)
			temp["email"] = sub.email
			temp["name"] = str(sub.first_name) + " " + str(sub.last_name)
			if sub.email == email:
				name = temp["name"]
			names_and_emails.append(temp)
	#This hides the submissions
	# submissions = []
	return render_template('show.html', email=email, name=name, submissions=submissions, names_and_emails=names_and_emails)

@app.route('/submit', methods=['GET', 'POST'])
def submit():
	if request.method == 'POST':
		success = submit_quiniela(request)
		if success:
			message = sendgrid.Mail()
			email = str(request.form['email'])
			message.add_to(str(request.form['first_name']) + " " +
				str(request.form['last_name']) + ' <' + email + '>')
			message.add_bcc('itorras13@gmail.com')
			message.set_subject('Eurocup16 Submission Confirmed')
			submissions = get_submissions("show")
			html = render_template('email_template.html', submissions=submissions, email=email)
			message.set_html(html)
			message.set_from('Ignacio Torras <itorras13@gmail.com>')
			status, msg = sg.send(message)
			submissions = get_submissions("index")
			return render_template("index.html", submissions=submissions, modal="success")
		else:
			submissions = get_submissions("index")
			return render_template("index.html", modal="failure", submissions=submissions)
	return render_template('submit.html')

@app.errorhandler(404)
def page_not_found(error):
	return redirect(url_for('index'))

def get_submissions(type):
	submissions = Submission.query.order_by(Submission.points.desc(), 
		Submission.id.desc()).all()
	if type == "show":
		return submissions
	else:
		updated_submissions = []
		for sub in submissions:
			new_sub = {}
			new_sub['email'] = sub.email
			new_sub['first_name'] = sub.first_name
			new_sub['last_name'] = sub.last_name
			new_sub['sub_num'] = sub.submission_number
			new_sub['champion'] = sub.champion
			new_sub['points'] = sub.points
			new_sub['paid'] = sub.paid
			updated_submissions.append(new_sub)
		return updated_submissions

def submit_quiniela(request):
	email=request.form['email']
	sub_num = request.form['submission_num']
	if not db.session.query(Submission).filter(Submission.submission_number == sub_num, Submission.email == email).count():
		new = Submission(request.form['first_name'], request.form['last_name'], email, sub_num,
			request.form["a1h"], request.form["a1a"], request.form["a2h"], request.form["a2a"], request.form["a3h"], request.form["a3a"],
			request.form["a4h"], request.form["a4a"], request.form["a5h"], request.form["a5a"], request.form["a6h"], request.form["a6a"],
			request.form["b1h"], request.form["b1a"], request.form["b2h"], request.form["b2a"], request.form["b3h"], request.form["b3a"],
			request.form["b4h"], request.form["b4a"], request.form["b5h"], request.form["b5a"], request.form["b6h"], request.form["b6a"],
			request.form["c1h"], request.form["c1a"], request.form["c2h"], request.form["c2a"], request.form["c3h"], request.form["c3a"],
			request.form["c4h"], request.form["c4a"], request.form["c5h"], request.form["c5a"], request.form["c6h"], request.form["c6a"],
			request.form["d1h"], request.form["d1a"], request.form["d2h"], request.form["d2a"], request.form["d3h"], request.form["d3a"],
			request.form["d4h"], request.form["d4a"], request.form["d5h"], request.form["d5a"], request.form["d6h"], request.form["d6a"],
			request.form["e1h"], request.form["e1a"], request.form["e2h"], request.form["e2a"], request.form["e3h"], request.form["e3a"],
			request.form["e4h"], request.form["e4a"], request.form["e5h"], request.form["e5a"], request.form["e6h"], request.form["e6a"],
			request.form["f1h"], request.form["f1a"], request.form["f2h"], request.form["f2a"], request.form["f3h"], request.form["f3a"],
			request.form["f4h"], request.form["f4a"], request.form["f5h"], request.form["f5a"], request.form["f6h"], request.form["f6a"],
			request.form["a1"], request.form["a2"], request.form["b1"], request.form["b2"], request.form["c1"], request.form["c2"],
			request.form["d1"], request.form["d2"], request.form["e1"], request.form["e2"], request.form["f1"], request.form["f2"],
			request.form["third1"], request.form["third2"], request.form["third3"], request.form["third4"],
			request.form["q1"], request.form["q2"], request.form["q3"], request.form["q4"],
			request.form["q5"], request.form["q6"], request.form["q7"], request.form["q8"],
			request.form["semi1"], request.form["semi2"], request.form["semi3"], request.form["semi4"],
			request.form["fin1"], request.form["fin2"], request.form["third_place"], request.form["champion"], request.form["top_scorer"])
		db.session.add(new)
		db.session.commit()
		return True
	return False


if __name__ == "__main__":
	# app.debug = True
	app.run()

