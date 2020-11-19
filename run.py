
from flask import Flask, render_template, jsonify,\
	request, json, send_from_directory

import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
	return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
