import sys
import os

# Add the path to your application
path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.append(path)

from app import app as application