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
sg = sendgrid.SendGridClient('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')

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)



class Submission(db.Model):
	#Person Info
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    email = db.Column(db.String(60))
    submission_number = db.Column(db.Integer)
    #Group Stage Games
    a1h = db.Column(db.Integer);a1a = db.Column(db.Integer);a2h = db.Column(db.Integer);a2a = db.Column(db.Integer);
    a3h = db.Column(db.Integer);a3a = db.Column(db.Integer);a4h = db.Column(db.Integer);a4a = db.Column(db.Integer);
    a5h = db.Column(db.Integer);a5a = db.Column(db.Integer);a6h = db.Column(db.Integer);a6a = db.Column(db.Integer);
    b1h = db.Column(db.Integer);b1a = db.Column(db.Integer);b2h = db.Column(db.Integer);b2a = db.Column(db.Integer);
    b3h = db.Column(db.Integer);b3a = db.Column(db.Integer);b4h = db.Column(db.Integer);b4a = db.Column(db.Integer);
    b5h = db.Column(db.Integer);b5a = db.Column(db.Integer);b6h = db.Column(db.Integer);b6a = db.Column(db.Integer);
    c1h = db.Column(db.Integer);c1a = db.Column(db.Integer);c2h = db.Column(db.Integer);c2a = db.Column(db.Integer);
    c3h = db.Column(db.Integer);c3a = db.Column(db.Integer);c4h = db.Column(db.Integer);c4a = db.Column(db.Integer);
    c5h = db.Column(db.Integer);c5a = db.Column(db.Integer);c6h = db.Column(db.Integer);c6a = db.Column(db.Integer);
    d1h = db.Column(db.Integer);d1a = db.Column(db.Integer);d2h = db.Column(db.Integer);d2a = db.Column(db.Integer);
    d3h = db.Column(db.Integer);d3a = db.Column(db.Integer);d4h = db.Column(db.Integer);d4a = db.Column(db.Integer);
    d5h = db.Column(db.Integer);d5a = db.Column(db.Integer);d6h = db.Column(db.Integer);d6a = db.Column(db.Integer);
    e1h = db.Column(db.Integer);e1a = db.Column(db.Integer);e2h = db.Column(db.Integer);e2a = db.Column(db.Integer);
    e3h = db.Column(db.Integer);e3a = db.Column(db.Integer);e4h = db.Column(db.Integer);e4a = db.Column(db.Integer);
    e5h = db.Column(db.Integer);e5a = db.Column(db.Integer);e6h = db.Column(db.Integer);e6a = db.Column(db.Integer);
    f1h = db.Column(db.Integer);f1a = db.Column(db.Integer);f2h = db.Column(db.Integer);f2a = db.Column(db.Integer);
    f3h = db.Column(db.Integer);f3a = db.Column(db.Integer);f4h = db.Column(db.Integer);f4a = db.Column(db.Integer);
    f5h = db.Column(db.Integer);f5a = db.Column(db.Integer);f6h = db.Column(db.Integer);f6a = db.Column(db.Integer);
    #Group Standings
    a1 = db.Column(db.String(25));a2 = db.Column(db.String(25));b1 = db.Column(db.String(25));b2 = db.Column(db.String(25));
    c1 = db.Column(db.String(25));c2 = db.Column(db.String(25));d1 = db.Column(db.String(25));d2 = db.Column(db.String(25));
    e1 = db.Column(db.String(25));e2 = db.Column(db.String(25));f1 = db.Column(db.String(25));f2 = db.Column(db.String(25));
    third1 = db.Column(db.String(25));third2 = db.Column(db.String(25));third3 = db.Column(db.String(25));third4 = db.Column(db.String(25));
    #QuarterFinalists
    q1 = db.Column(db.String(25));q2 = db.Column(db.String(25));q3 = db.Column(db.String(25));q4 = db.Column(db.String(25));
    q5 = db.Column(db.String(25));q6 = db.Column(db.String(25));q7 = db.Column(db.String(25));q8 = db.Column(db.String(25));
    #SemiFinalists
    semi1 = db.Column(db.String(25));semi2 = db.Column(db.String(25));semi3 = db.Column(db.String(25));semi4 = db.Column(db.String(25));
    #Finalista and Champions
    fin1 = db.Column(db.String(25));fin2 = db.Column(db.String(25));third_place = db.Column(db.String(25));champion = db.Column(db.String(25))
    #Other
    top_scorer = db.Column(db.String(40))
    publish_date = db.Column(db.DateTime)
    points = db.Column(db.Integer)
    payed = db.Column(db.Boolean)

    def __init__(self, first_name, last_name, email, submission_number,
		a1h, a1a, a2h, a2a, a3h, a3a, a4h, a4a, a5h, a5a, a6h, a6a, b1h, b1a, b2h, b2a, b3h, b3a,
		b4h, b4a, b5h, b5a, b6h, b6a, c1h, c1a, c2h, c2a, c3h, c3a, c4h, c4a, c5h, c5a, c6h, c6a,
		d1h, d1a, d2h, d2a, d3h, d3a, d4h, d4a, d5h, d5a, d6h, d6a, e1h, e1a, e2h, e2a, e3h, e3a,
		e4h, e4a, e5h, e5a, e6h, e6a, f1h, f1a, f2h, f2a, f3h, f3a, f4h, f4a, f5h, f5a, f6h, f6a,
		a1, a2, b1, b2, c1, c2, d1, d2, e1, e2, f1, f2, third1, third2, third3, third4,
		q1, q2, q3, q4, q5, q6, q7, q8, semi1, semi2, semi3, semi4, fin1, fin2, third_place, champion,
		top_scorer):
		#Person Info
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.submission_number = submission_number
        #Group Stage Games
        self.a1h = a1h; self.a1a = a1a; self.a2h = a2h; self.a2a = a2a; self.a3h = a3h; self.a3a = a3a;
        self.a4h = a4h; self.a4a = a4a; self.a5h = a5h; self.a5a = a5a; self.a6h = a6h; self.a6a = a6a;
        self.b1h = b1h; self.b1a = b1a; self.b2h = b2h; self.b2a = b2a; self.b3h = b3h; self.b3a = b3a;
        self.b4h = b4h; self.b4a = b4a; self.b5h = b5h; self.b5a = b5a; self.b6h = b6h; self.b6a = b6a;
        self.c1h = c1h; self.c1a = c1a; self.c2h = c2h; self.c2a = c2a; self.c3h = c3h; self.c3a = c3a;
        self.c4h = c4h; self.c4a = c4a; self.c5h = c5h; self.c5a = c5a; self.c6h = c6h; self.c6a = c6a;
        self.d1h = d1h; self.d1a = d1a; self.d2h = d2h; self.d2a = d2a; self.d3h = d3h; self.d3a = d3a;
        self.d4h = d4h; self.d4a = d4a; self.d5h = d5h; self.d5a = d5a; self.d6h = d6h; self.d6a = d6a;
        self.e1h = e1h; self.e1a = e1a; self.e2h = e2h; self.e2a = e2a; self.e3h = e3h; self.e3a = e3a;
        self.e4h = e4h; self.e4a = e4a; self.e5h = e5h; self.e5a = e5a; self.e6h = e6h; self.e6a = e6a;
        self.f1h = f1h; self.f1a = f1a; self.f2h = f2h; self.f2a = f2a; self.f3h = f3h; self.f3a = f3a;
        self.f4h = f4h; self.f4a = f4a; self.f5h = f5h; self.f5a = f5a; self.f6h = f6h; self.f6a = f6a;
        #Group Standings
        self.a1 = a1; self.a2 = a2; self.b1 = b1; self.b2 = b2; self.c1 = c1; self.c2 = c2;
        self.d1 = d1; self.d2 = d2; self.e1 = e1; self.e2 = e2; self.f1 = f1; self.f2 = f2;
        self.third1 = third1; self.third2 = third2; self.third3 = third3; self.third4 = third4;
        #QuarterFinalists
        self.q1 = q1; self.q2 = q2; self.q3 = q3; self.q4 = q4;
        self.q5 = q5; self.q6 = q6; self.q7 = q7; self.q8 = q8;
        #SemiFinalists
        self.semi1 = semi1;self.semi2 = semi2;self.semi3 = semi3;self.semi4 = semi4;
        #Finalists and champions
        self.fin1 = fin1; self.fin2 = fin2; self.champion = champion; self.third_place = third_place;
        #Other
        self.top_scorer = top_scorer
        self.publish_date = datetime.utcnow()
        self.points = 0
        self.payed = False

    def __repr__(self):
        return '<Name %r>' % self.first_name

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
			submissions = get_submissions("submit")
			return render_template("index.html", submissions=submissions, modal="success")
		else:
			return render_template("index.html", modal="failure")
	return render_template('submit.html')

@app.errorhandler(404)
def page_not_found(error):
	return redirect(url_for('index'))

def get_submissions(type):
	if type == "submit":
		submissions = Submission.query.order_by(Submission.id.desc()).all()
	else:
		submissions = Submission.query.order_by(Submission.points.desc(), 
			Submission.id.asc()).all()
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

