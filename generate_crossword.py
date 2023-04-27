from genxword.control import Genxword
import json
import openai
import re
from api_keys import OPENAI_API_KEY, OPENAI_ORG_ID

openai.api_key = OPENAI_API_KEY
openai.organization = OPENAI_ORG_ID

def get_words(theme):
    try:
        system = "You are a New York Time's crossword puzzle creator, and you generate lists of varied words for a crossword puzzle based on a centralized theme. The lists of words you generate should be relatively short, related somewhat to the topic at hand, yet not to similar to one another or obscure. Importantly, the words should be an approximately even mix of nouns, verbs, adjectives, etc. When given a theme, you only response with a list of comma separated words that fit the theme."
        prompt = f"Create a list of around 10 words relating to the user-provided theme: {theme}\n\n. Words should be a varied mix of verbs, adjectives, and nouns. Respond only with the list of words, and do not include any other information or punctuation. Do not include any words with hyphens or apostrophes:\n\n"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt},
                      {"role": "system", "content": system}],
            timeout=180
        )
    except Exception as e:
        print(e)
        return None

    response_content = response.choices[0].message['content'].strip().lower()
    print(response_content)
    word_list = [re.sub(r'[^a-zA-Z]', '', word) for word in response_content.split(",") if word != ""]
    if len(word_list) <= 1 or len(word_list) > 15:
        return None
    
    return word_list

def get_clues(theme, word_list):
    try:
        system = "You are a New York Time's crossword puzzle creator, and you generate clues for a list of words in a crossword based around a central theme. Clues should be somewhat cryptic and very brief, yet clear once the answer is known. Clues should not use words that appear in the crossword. Clues should be similar in form to those that are seen in New York Times crossword puzzles. No clue should be more than about 6 words. Most clues should be 2 or 3 words"
        prompt = f"The theme is {theme}.\n\nCreate a list of clues, in order, for the given words. Clues should be in a numbered list. There should be exactly as many clues as there are words.\n\nWords:\n\n{', '.join(word_list)}\n\nClues:\n\n"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt},
                      {"role": "system", "content": system}],
            timeout=180
        )
    except Exception as e:
        print(e)
        return None

    response_content = response.choices[0].message['content'].strip().upper()
    print(response_content)
    clue_list = [re.sub(r'[^a-zA-Z ]', '', word).strip() for word in response_content.split("\n") if word != ""]
    if len(clue_list) != len(word_list):
        return None
    
    return clue_list

def generate_crossword(theme):
    word_list = get_words(theme)
    if not word_list:
        return None

    clues_list = get_clues(theme, word_list)
    if not clues_list:
        return None
    
    gen = Genxword(auto=True, mixmode=False)
    gen.wlist(word_list, len(word_list))
    gen.grid_size()

    grid, word_locations = gen.gengrid()
    return grid, word_locations, word_list, clues_list
