import sys
import os

# Add your project directory to the sys.path

# # OLD PATH
# path = os.path.dirname(os.path.abspath(__file__))
# if path not in sys.path:
#     sys.path.append(path)
# This path as per project uploaded in pythonanywhere web app platform
project_home = '/home/madhubandru/florida-drivers-license-app/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Import your Flask app
from app import app as application