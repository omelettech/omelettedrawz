# backend/firebase.py
import firebase_admin
from firebase_admin import credentials, auth

# Replace this with the path to your service account key
cred = credentials.Certificate("path/to/your/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
