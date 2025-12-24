import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from features import extract_url_features

MODEL_PATH = 'rf_model.pkl'

class URLClassifier:
    def __init__(self):
        self.model = None
        self.load_or_train_model()

    def load_or_train_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = joblib.load(MODEL_PATH)
                print("Loaded existing ML model.")
            except Exception as e:
                print(f"Error loading model: {e}. Retraining...")
                self.train_dummy_model()
        else:
            print("No model found. Training dummy model...")
            self.train_dummy_model()

    def train_dummy_model(self):
        """
        Trains a dummy Random Forest model on synthetic data for demonstration.
        In a real app, this would load a large dataset (e.g. PhishTank).
        """
        # Synthetic Data (Features: length, num_dots, num_subdomains, has_ip, http, https, @, -)
        # 0 = Legitimate, 1 = Phishing
        
        # Legitimate examples (shorter, https, no IPs)
        X_legit = [
            [20, 2, 1, 0, 0, 1, 0, 0], # https://google.com
            [25, 2, 1, 0, 0, 1, 0, 0], # https://facebook.com
            [30, 3, 2, 0, 0, 1, 0, 0], # https://mail.google.com
            [15, 1, 0, 0, 1, 0, 0, 0], # http://example.com
            [40, 2, 1, 0, 0, 1, 0, 1], # https://stack-overflow.com
        ]
        y_legit = [0] * len(X_legit)

        # Phishing examples (longer, IPs, http, many dots/subdomains)
        X_phish = [
            [60, 4, 3, 1, 1, 0, 1, 1], # http://192.168.1.1/login...
            [80, 5, 4, 0, 1, 0, 0, 1], # http://secure-login.bank.com.update-info...
            [55, 3, 2, 0, 0, 0, 1, 0], # ftp://phishing@site.com
            [90, 6, 5, 1, 1, 0, 0, 1], # http://10.0.0.1/verify-account...
            [70, 4, 3, 0, 1, 0, 0, 1], # http://apple-id-verify.com.suspicious.net
        ]
        y_phish = [1] * len(X_phish)

        X = np.array(X_legit + X_phish)
        y = np.array(y_legit + y_phish)

        self.model = RandomForestClassifier(n_estimators=10, random_state=42)
        self.model.fit(X, y)
        
        joblib.dump(self.model, MODEL_PATH)
        print("Dummy model trained and saved.")

    def predict(self, url):
        """
        Predicts if a URL is phishing.
        Returns dictionary with class and probability.
        """
        features = np.array(extract_url_features(url)).reshape(1, -1)
        prob = self.model.predict_proba(features)[0][1] # Probability of class 1 (Phishing)
        # prediction = self.model.predict(features)[0]
        
        return {
            'risk_score': float(prob) # 0.0 to 1.0
        }
