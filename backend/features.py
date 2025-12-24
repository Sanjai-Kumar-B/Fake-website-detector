import re
import socket
from urllib.parse import urlparse
import ipaddress

def get_url_length(url):
    return len(url)

def entropy(string):
    """Calculates the Shannon entropy of a string."""
    import math
    prob = [float(string.count(c)) / len(string) for c in dict.fromkeys(list(string))]
    entropy = - sum([p * math.log(p) / math.log(2.0) for p in prob])
    return entropy

def has_ip_address(url):
    try:
        parsed_url = urlparse(url)
        hostname = parsed_url.hostname
        if hostname:
            ipaddress.ip_address(hostname)
            return 1
    except ValueError:
        return 0
    return 0

def num_dots(url):
    return url.count('.')

def num_subdomains(url):
    parsed_url = urlparse(url)
    if not parsed_url.hostname:
        return 0
    return parsed_url.hostname.count('.')

def has_http(url):
    return 1 if "http://" in url else 0

def has_https(url):
    return 1 if "https://" in url else 0

def extract_url_features(url):
    """
    Extracts structural features from a URL.
    Returns a list of feature values.
    Feature order must match the ML model training.
    """
    
    # Ensure URL has a scheme for parsing
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url

    features = {
        'url_length': get_url_length(url),
        'num_dots': num_dots(url),
        'num_subdomains': num_subdomains(url),
        'has_ip': has_ip_address(url),
        'has_http': has_http(url),
        'has_https': has_https(url),
        'has_at_symbol': 1 if '@' in url else 0,
        'has_hyphen': 1 if '-' in url else 0,
        # Potentially more complex features (e.g. domain age) could be added here
        # but require external API calls (whois), which might be slow.
        # Keeping it structural for speed.
    }
    
    # Return as list for model input
    return [
        features['url_length'],
        features['num_dots'],
        features['num_subdomains'],
        features['has_ip'],
        features['has_http'],
        features['has_https'],
        features['has_at_symbol'],
        features['has_hyphen']
    ]
