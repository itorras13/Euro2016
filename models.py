from datetime import datetime
from app import db

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
	paid = db.Column(db.Boolean)

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
		self.paid = False

	def __repr__(self):
		return '<Name %r>' % self.first_name