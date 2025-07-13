# Khaled H. Amoura - FPV Drone Pilot Website

A professional website for Khaled H. Amoura, an award-winning FPV drone pilot specializing in automotive, sports, and film cinematography.

## Features

- Responsive design that works on all devices
- Dynamic portfolio filtering system
- Modern animations and transitions
- Professional contact form
- Optimized for SEO
- Clean, modern aesthetic with drone-themed elements

## Setup and Installation

1. Clone this repository:
```
git clone [repository-url]
cd [repository-name]
```

2. Set up a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Run the application:
```
python app.py
```

5. Open your browser and navigate to:
```
http://127.0.0.1:5000/
```

## Project Structure

```
project-root/
│
├── app.py                  # Flask application file
│
├── static/                 # Static files directory
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   │
│   ├── img/                # Image directory with project photos and logos
│   │
│   └── vid/                # Video directory with showreel
│
└── templates/              # HTML templates directory
    ├── base.html           # Base template with common elements
    ├── index.html          # Home page
    ├── about.html          # About page
    ├── portfolio.html      # Portfolio page
    └── contact.html        # Contact page
```

## Customization

### Adding New Projects

To add new projects to the portfolio, edit the `projects` list in `app.py`:

```python
projects = [
    {
        'id': 7,  # Increment this ID
        'title': 'Your New Project Title',
        'description': 'Brief description of the project',
        'thumb': 'project7.jpg',  # Add this image to static/img/
        'video': 'https://youtu.be/yourlink',
        'category': 'Automotive'  # Use existing categories or create new ones
    },
    # ... existing projects
]
```

### Updating Content

- Text content can be modified directly in the respective HTML templates
- To update the hero video, replace `hero.mp4` in the `static/vid/` directory
- To update client logos, replace the respective SVG files in `static/img/`

## Production Deployment

When deploying to production:

1. Update the `app.secret_key` in `app.py` with a secure random string
2. Set `debug=False` in `app.run()`
3. Consider using a production WSGI server like Gunicorn or uWSGI
4. Set up proper email handling for the contact form

## Recommended Hosting Options

- **Heroku**: Easy deployment with Python support
- **DigitalOcean**: Affordable VPS options
- **PythonAnywhere**: Python-specific hosting with free tier
- **AWS Elastic Beanstalk**: Scalable solution

## Additional Features to Consider

- **Blog section**: Share insights about FPV drone piloting
- **Video gallery**: Expanded portfolio with categorized videos
- **Equipment page**: Detailed showcase of your drone collection
- **Client login area**: Private area for clients to view their footage
- **Booking calendar**: Allow clients to check your availability

## Credits

- Font Awesome for icons
- Flask web framework
- Design by [Your Name]

## License

All rights reserved. This project and its contents are proprietary to Khaled H. Amoura.