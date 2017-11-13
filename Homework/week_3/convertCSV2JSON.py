# Tiny Le
# 11130717


# Covert into KNMI text file into JSON format

# YYYYMMDD = Datum (YYYY=jaar MM=maand DD=dag);
# RH       = Etmaalsom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
#
# STN,YYYYMMDD,   RH

#
#  {
#   "Month":[
#       "Date"
#       "Amount"
#       ],
#  }
#

# Save it into JSON file

import csv
import json

# Load in CSV
f = open('knmi.csv', 'r')
csv_f = csv.reader(f);

testList = []
for row in csv_f:
    date = row[0]
    dateFormatted = date[0:4] + '-' + date[4:6] + '-' + date[6:8]
    print dateFormatted
    amount = row[1]
    data = { 'date':dateFormatted, 'amount':amount }
    testList.append(data)

# Reformat data into JSON
with open('knmi.json', 'w') as fp:
    json.dump(testList, fp)

fp.close
