# Dataprocessing
# Week 3: Interactive Bar Chart with D3
#
# Tiny Le
# 11130717

import csv
import json

# Load in CSV
with open('data2.csv', 'r') as csvFile:
    # Encoding the content in utf-8-sig to remove the BOM at beginning
    # https://stackoverflow.com/questions/8898294/convert-utf-8-with-bom-to-utf-8-with-no-bom-in-python
    csvData = csv.reader(csvFile.read().decode('utf-8-sig').encode('utf-8').splitlines())

# Empty arrays to store the CSV and JSON data
jsonData= []
data = []

# Go through every line in the CSV file
for row in csvData:
    date = row[0]

    averageLelystad = row[1]
    minLelystad = row[2]
    maxLelystad = row[3]

    averageMaastricht = row[4]
    minMaastricht = row[5]
    maxMaastricht = row[6]

    # Turn it into json format
    data = { 'date':date, 'averageLelystad':averageLelystad, 'minLelystad':minLelystad, 'maxLelystad':maxLelystad, 'averageMaastricht':averageMaastricht, 'minMaastricht':minMaastricht, 'maxMaastricht':maxMaastricht }

    jsonData.append(data)

# Open JSON file and write the data
with open('data.json', 'w') as jsonFile:
    json.dump(jsonData, jsonFile)
