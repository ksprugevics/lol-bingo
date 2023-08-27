import csv

# Open the CSV file for reading
csv_filename = '.cards.csv'
js_filename = '.cards.js'

rift_cards = []
aram_cards = []

with open(csv_filename, 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    
    # Skip the header row
    next(csv_reader)
    
    for row in csv_reader:
        name = row[0].strip('"')
        value = int(row[1])

        if value in [0, 1]:
            rift_cards.append(name)

        if value in [0, 2]:
            aram_cards.append(name)

# Create the JavaScript arrays in a text file
with open(js_filename, 'w') as js_file:
    js_file.write('const riftCards = [\n')
    js_file.write(',\n'.join([f'    "{name}"' for name in rift_cards]))
    js_file.write('\n];\n')

    js_file.write('\n')

    js_file.write('const aramCards = [\n')
    js_file.write(',\n'.join([f'    "{name}"' for name in aram_cards]))
    js_file.write('\n];')

print(f'JavaScript arrays written to {js_filename}')