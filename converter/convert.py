import csv
import json



with open('3_mol.csv', "rt", encoding='ascii') as infile:
    read = csv.reader(infile)
    x = []
    
    for row in read :
    
        anot = row[7].split(';')
        s = { 'v': [float(row[0]),float(row[1]),float(row[2]),int(row[3]),int(row[4]),int(row[5]),int(row[6]),], 'a':[anot[1], anot[0]]}
        
        print(s)
        x.append(s)
        
     #x =   [{'a': row[0], 'v': row[1]} for z in read]
    jsonString  = json.dumps(x) 
    pre = '{"nodes":'
    suf = '}'
    jsonString = pre + jsonString + suf
    #WRITE TO FILE
    text_file = open("converted.txt", "w")
    n = text_file.write(jsonString)
    text_file.close()
    
   #print (jsonString)
    #print (x[0]['v'][0])

