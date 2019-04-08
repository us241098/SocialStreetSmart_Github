from models.convnets import ConvolutionalNet
from keras.models import load_model
from keras.preprocessing import sequence
from preprocessors.preprocess_text import clean
import sys
import string 
import re

from flask import Flask, request
app = Flask(__name__)


MATCH_MULTIPLE_SPACES = re.compile("\ {2,}")
SEQUENCE_LENGTH = 20
EMBEDDING_DIMENSION = 30

UNK = "<UNK>"
PAD = "<PAD>"


vocabulary = open("data/vocabulary.txt").read().split("\n")
inverse_vocabulary = dict((word, i) for i, word in enumerate(vocabulary))


model_path="models/detector.h5"
model = ConvolutionalNet(vocabulary_size=len(vocabulary), embedding_dimension=EMBEDDING_DIMENSION, input_length=SEQUENCE_LENGTH)
model.load_weights(model_path)


def words_to_indices(inverse_vocabulary, words):
    return [inverse_vocabulary.get(word, inverse_vocabulary[UNK]) for word in words]

    
def predict (headline):
    headline = headline.encode("ascii", "ignore")
    inputs = sequence.pad_sequences([words_to_indices(inverse_vocabulary, clean(headline).lower().split())], maxlen=SEQUENCE_LENGTH)
    clickbaitiness = model.predict(inputs)[0, 0]
    return clickbaitiness


@app.route('/', methods=['GET', 'POST'])
def trigger():
    name= request.get_json(force=True)
    print name
    name=name['text']

    print "in function trigger"
    k = predict(str(name))
    return str(k)


def predictt():
    print ("headline is {0} % clickbaity".format(round(predict("you wont believe what happend next") * 100, 2)))
    



predictt()





if __name__ == '__main__':
    app.run(host='localhost', port=80)

