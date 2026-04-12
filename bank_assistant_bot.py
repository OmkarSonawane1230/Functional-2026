import nltk
import string
import random
import warnings
warnings.filterwarnings('ignore')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Define a knowledge base (Customer Support FAQ for a Bank)
raw_text = """
Welcome to the Universal Bank virtual assistant!
We offer various services including personal loans, credit cards, and savings accounts.
To open a savings account, you need a valid ID, proof of address, and a minimum deposit of ₹50.
The interest rate for a savings account is 3.5% annually.
You can apply for a personal loan online through our banking portal or mobile app.
To apply for a credit card, you must have a credit score of at least 650.
If you lose your debit card, please block it immediately via the mobile app or call our 24/7 toll-free number.
Our bank branches are open from 9:00 AM to 5:00 PM, Monday to Friday.
You can check your account balance by sending an SMS with the text "BAL" to 12345.
International transactions have a 2% foreign exchange fee.
For any complaints, email support@universalbank.com.
There are zero maintenance charges for student accounts.
"""

# Text Preprocessing
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('omw-1.4', quiet=True)

# Tokenize the text into sentences
sentence_tokens = nltk.sent_tokenize(raw_text)

# Tokenization and Lemmatization setup
lemmatizer = nltk.stem.WordNetLemmatizer()

def lem_tokens(tokens):
    return [lemmatizer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def pre_process(text):
    return lem_tokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Greeting responses
GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREETING_RESPONSES = ["Hi there", "Hello!", "I am glad! You are talking to me", "How can I help you today?"]

def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

# Response Generation using TF-IDF and Cosine Similarity
def generate_response(user_input):
    bot_response = ''
    sentence_tokens.append(user_input)
    
    # Create the TF-IDF vectorizer and transform the text
    TfidfVec = TfidfVectorizer(tokenizer=pre_process, stop_words='english')
    tfidf = TfidfVec.fit_transform(sentence_tokens)
    
    # Calculate cosine similarity between the user input and the document sentences
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    
    req_tfidf = flat[-2]
    
    if(req_tfidf == 0):
        bot_response = bot_response + "I am sorry! I don't understand you. Please phrase your question differently."
        return bot_response
    else:
        bot_response = bot_response + sentence_tokens[idx]
        return bot_response

def run_chatbot():
    print("Bot: Hello! I am the Universal Bank AI Assistant.")
    print("Bot: You can ask me questions about loans, credit cards, bank hours, and accounts.")
    print("Bot: (Type 'bye' or 'exit' to quit)")
    
    while True:
        user_input = input("\nYou: ").lower()
        if user_input != 'bye' and user_input != 'exit':
            if user_input in ['thanks', 'thank you']:
                print("Bot: You're welcome!")
                break
            else:
                if greeting(user_input) is not None:
                    print("Bot: " + greeting(user_input))
                else:
                    print("Bot: ", end="")
                    print(generate_response(user_input))
                    sentence_tokens.remove(user_input)
        else:
            print("Bot: Goodbye! Have a great day.")
            break

if __name__ == "__main__":
    run_chatbot()