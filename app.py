from flask import Flask, render_template, request, redirect, url_for, flash
import os
from werkzeug.utils import secure_filename
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this in production

# Sample project data - in a real application, this would come from a database
projects = [
    {
        'id': 1,
        'title': 'Red Bull Rampage FPV',
        'description': 'Dynamic follow shots of extreme mountain biking at the world\'s premier freeride event.',
        'thumb': 'project1.jpg',
        'video': 'https://youtu.be/example1',
        'category': 'Sports'
    },
    {
        'id': 2,
        'title': 'BMW Ultimate Drive Experience',
        'description': 'Precision tracking and interior-to-exterior transitions for the M5 product launch.',
        'thumb': 'project2.jpg',
        'video': 'https://youtu.be/example2',
        'category': 'Automotive'
    },
    {
        'id': 3,
        'title': 'Wadi Rum Cinematic Flight',
        'description': 'Long-range desert landscapes showcasing the dramatic terrain for a travel documentary.',
        'thumb': 'project3.jpg',
        'video': 'https://youtu.be/example3',
        'category': 'Long‑Range'
    },
    {
        'id': 4,
        'title': 'Action Film Chase Sequence',
        'description': 'Fast-paced urban chase scene with proximity flying between buildings.',
        'thumb': 'project4.jpg',
        'video': 'https://youtu.be/example4',
        'category': 'Film'
    },
    {
        'id': 5,
        'title': 'Porsche Taycan Launch',
        'description': 'Electric vehicle showcase with dynamic racing shots on closed mountain roads.',
        'thumb': 'project5.jpg',
        'video': 'https://youtu.be/example5',
        'category': 'Automotive'
    },
    {
        'id': 6,
        'title': 'SOFEX Military Exhibition',
        'description': 'Aerial cinematography for Jordan\'s special operations exhibition and tactical demonstrations.',
        'thumb': 'project6.jpg',
        'video': 'https://youtu.be/example6',
        'category': 'Sports'
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')



@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html', projects=projects)

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/tabsection')
def tabsection():
    # Temporary redirect to home
    return redirect(url_for('home'))

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    success = False
    error = False
    if request.method == 'POST':
        try:
            # Process the form data
            name = request.form.get('name')
            email = request.form.get('email')
            project_type = request.form.get('project_type')
            message = request.form.get('message')
            
            # In a real application, you would save this to a database
            # and/or send an email notification
            
            # Simulate an error for demonstration purposes (1 in 3 chance)
            if random.randint(1, 3) == 1:
                raise Exception("Simulated error")
                
            # Success path
            success = True
            flash('Thank you for your message! I will get back to you soon.')
            
        except Exception as e:
            # Error path
            error = True
            flash('There was an error sending your message. Please try again or contact me directly.', 'error')
            
    return render_template('contact.html', success=success, error=error)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    if request.method == 'POST':
        email = request.form.get('email')
        # In a real application, you would add this email to your newsletter list
        flash('Thank you for subscribing to our newsletter!')
    return redirect(request.referrer or url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')