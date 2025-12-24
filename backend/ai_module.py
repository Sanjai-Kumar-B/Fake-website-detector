from transformers import pipeline

class TextAnalyzer:
    def __init__(self):
        print("Loading AI model (DistilBERT)... This might take a while on first run.")
        try:
            # We use a zero-shot classification pipeline or text-classification.
            # For this specific task, a fine-tuned model on phishing text is best, 
            # but for a general demo, we can use a sentiment/risk analysis approach 
            # or a pre-trained phishing model if available.
            # "distilbert-base-uncased-finetuned-sst-2-english" is for sentiment.
            # Let's use a zero-shot classifier for more flexibility without specific training data for now,
            # allowing us to define labels like "Urgent/Threatening", "Safe/Informational".
            # Or simpler: use a model known for spam detection if available. 
            # Given the constraints, let's use a standard text-classification pipeline 
            # and simulate valid phishing outputs or try to use a generic model.
            
            # Better approach for this demo:
            # Use a model that can detect 'spam' or 'ham'.
            # 'mrm8488/bert-tiny-finetuned-sms-spam-detection' is small and effective for this.
            self.classifier = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-sms-spam-detection")
            print("AI model loaded.")
        except Exception as e:
            print(f"Error loading AI model: {e}")
            self.classifier = None

    def analyze_text(self, text):
        """
        Analyzes text for phishing/spam probability.
        """
        if not self.classifier or not text:
            return 0.5 # Neutral score if failed

        # The model returns LABEL_0 (Legit) or LABEL_1 (Spam) usually, 
        # but let's check the specific model outputs.
        # For mrm8488/bert-tiny-finetuned-sms-spam-detection:
        # LABEL_0 = Ham (Safe), LABEL_1 = Spam (Phishing)
        
        try:
            # Truncate text to fit model max length
            result = self.classifier(text[:512])[0]
            label = result['label']
            score = result['score']

            if label == 'LABEL_1' or label == 'Spam':
                return score # High probability of being fake
            else:
                return 1.0 - score # High probability of being safe -> Low risk score
        except Exception:
            return 0.5
