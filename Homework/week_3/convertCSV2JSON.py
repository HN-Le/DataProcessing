# Dataprocessing
# Week 3: Interactive Bar Chart with D3
#
# Tiny Le
# 11130717

import csv
import json

# Load in CSV
with open('knmi.csv', 'r') as csvFile:
    # Encoding the content in utf-8-sig to remove the BOM at beginning
    # https://stackoverflow.com/questions/8898294/convert-utf-8-with-bom-to-utf-8-with-no-bom-in-python
    csvData = csv.reader(csvFile.read().decode('utf-8-sig').encode('utf-8').splitlines())

# Empty arrays to store the CSV and JSON data
jsonData= []
data = []

# Go through every line in the CSV file
for row in csvData:
    date = row[0]
    day = date[6:8]
    month = date[4:6]
    year = date[0:4]

    # Formate dates to be more readable
    dateFormatted =  day + '-' + month + '-' + year
    amount = int(row[1])

    # Turn it into json format
    data = { 'date':dateFormatted, 'amount':str(amount) }

    # Only save the last two weeks of November
    if int(day) > 16 and int(month) == 11:
        jsonData.append(data)

# Open JSON file and write the data
with open('knmi.json', 'w') as jsonFile:
    json.dump(jsonData, jsonFile)
