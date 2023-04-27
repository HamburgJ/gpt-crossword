from flask_restful import Api, Resource, request
from generate_crossword import generate_crossword

class CrosswordApiHandler(Resource):
  def get(self):
    theme = request.args.get('theme')
    crossword, locations, words, clues = generate_crossword(theme)
    return {
      'resultStatus': 'SUCCESS',
      'theme': theme,
      'words': words,
      'clues': clues,
      'crossword': crossword,
      'locations': locations
      }