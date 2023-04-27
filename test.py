from genxword.control import Genxword

def generate_crossword(word_list):
    # Generate a simple crossword as .puz
    gen = Genxword(auto=True, mixmode=False)
    gen.wlist(word_list, len(word_list))
    gen.grid_size()
    gen.gengrid('test', 'z')

if __name__ == '__main__':
    print(generate_crossword([
        'land', 'successful', 'climb', 'yet', 'picture', 'traffic', 'skin', 'leadership', 'threaten', 'win'
    ]))