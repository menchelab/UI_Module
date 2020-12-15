import csv
import json



with open('1_spring.csv', "rt", encoding='ascii') as infile:
    read = csv.reader(infile)
    start = []
    end = []
    
    for row in read :
    
        start.append(int(row[0]))
        end.append(int(row[1]))
        
    x =   {'start': start, 'end': end} 
    jsonString  = json.dumps(x) 

    #jsonString = pre + jsonString + suf
    #WRITE TO FILE
    text_file = open("convertedLinks.txt", "w")
    n = text_file.write(jsonString)
    text_file.close()
    
   #print (jsonString)
    #print (x[0]['v'][0])