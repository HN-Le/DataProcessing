#!/usr/bin/env python
# Name: Tiny Le
# Student number: 11130717

'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    # Make a list to store all the tv series
    tvSeriesList = []

    # Loop through all the data and extract the relevant ones
    for item in dom.by_tag("div.lister-item"):

        actors = ''

        # Loop through the serie data to get the actors
        for tvActor in item.by_tag("div.lister-item-content")[0].by_tag("p")[2].by_tag("a"):
            # Add commas to seperate the actors exept at the beginning
            if actors != '':
                actors += ', '
            actors += tvActor.content

        # Make a list to store the data of the tv series
        itemList = []

        # Extract the relevant data
        title = item.by_tag("h3.lister-item-header")[0].by_tag("a")[0].content
        rating = item.by_tag("div.ratings-imdb-rating")[0].attrs.get("data-value","")
        genre = item.by_tag("p.text-muted")[0].by_tag("span.genre")[0].content
        runtime = item.by_tag("p.text-muted")[0].by_tag("span.runtime")[0].content

        # Encode it so it can be shown and add it to the itemlist
        itemList.append(title.encode('utf-8').strip())
        itemList.append(rating.encode('utf-8').strip())
        itemList.append(genre.encode('utf-8').strip())
        itemList.append(actors.encode('utf-8').strip())
        itemList.append(runtime.encode('utf-8').strip())

        # Add the serie data to the tvseries list
        tvSeriesList.append(itemList)

    return tvSeriesList

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    # Loop through the tvserie list and Write every serie into the CSV file
    for item in tvseries:
        writer.writerow(item)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
