# Dataprocessing
# Week 4: Scatterplot
#
# Tiny Le
# 11130717

import csv
import json

# Load in CSV
with open('data.csv', 'r') as csvFile:
    # Encoding the content in utf-8-sig to remove the BOM at beginning
    # https://stackoverflow.com/questions/8898294/convert-utf-8-with-bom-to-utf-8-with-no-bom-in-python
    csvData = csv.reader(csvFile.read().decode('utf-8-sig').encode('utf-8').splitlines())

# Empty arrays to store the CSV and JSON data
jsonData= []
data = []

firstLine = True
endLine = False

# Go through every line in the CSV file
for row in csvData:

    # To skip first line
    if firstLine:
        firstLine = False
        continue

    # To check if its the last valid data line
    if row[0] == "":
        print ("BREAK")
        endLine = True

    if endLine == False:
        rank = row[0]
        country = row[1]
        lifeExpectancy = row[2]
        wellBeing = row[3]
        footPrint = row[4]
        inequalityIncome = row[5]
        happyPlanetIndex = row[6]
        region = row[7]

        # Turn it into json format
        data = {'country':country, 'region':region, 'rank':rank, 'lifeExpectancy':lifeExpectancy,
                'wellBeing':wellBeing, 'footPrint':footPrint,
                'inequalityIncome':inequalityIncome,
                'happyPlanetIndex':happyPlanetIndex
                }

        print ("DATA")
        jsonData.append(data)

# Open JSON file and write the data
with open('data.json', 'w') as jsonFile:
    json.dump(jsonData, jsonFile)
