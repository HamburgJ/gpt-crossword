from genxword.control import Genxword
import json

def generate_crossword(word_list):
    gen = Genxword(auto=True, mixmode=False)
    gen.wlist(word_list, len(word_list))
    gen.grid_size()
    return gen.gengrid()
    