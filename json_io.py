from flask import request, jsonify, render_template
import requests
import sys
import time
from flask import Flask, render_template, request, redirect, Response, send_file, url_for
import random, json
from os import listdir
from os.path import isfile, join



app = Flask(__name__)

@app.route('/')
def output():
    # serve index template
    return render_template('main.html')

    
@app.route('/_side/')
def output1():
    # serve index template
    return render_template('sidepanel1.html')
    
@app.route('/_pp/')
def output2():
    # serve index template
    return render_template('pp.html')
    
    
@app.route('/_nodepanel/')
def output3():
    # serve index template
    return render_template('nodepanel.html')
    

@app.route('/_results/')
def output4():
    # serve index template
    return render_template('results.html')

@app.route('/upload', methods=['GET'])
def swimmer():
    return render_template('upload.html')



@app.route('/maps/<filename>/')
def get_image(filename):
	# https://stackoverflow.com/questions/53202636/render-dynamically-changing-images-with-same-filenames-in-flask
	print('display_image filename: ' + filename)
	return redirect(url_for('static', filename='maps/' + filename), code=301)

@app.route("/print", methods=['GET', 'POST'])

def backlog():
    if request.method == 'POST':
        
       
        print(request.data)
        
        return request.data
    else:
         
        print(request.data)
       
        return request.data



if __name__ == '__main__':
    # run!
    app.run()

    
    
    
        
  
# # GET FILENAMES FROM FLASK DB (FOR NOW TEXTFILES)
# @app.route('/_GetDbFileNames/', methods=['POST'])
# def GetDbFileNames():
    # data =request.get_json()
    # print("received GetDbFileNames request")
    # r = requests.get('http://asimov.westeurope.cloudapp.azure.com:8887/api/namespace/summary', auth=('steveballmer','code peaceful canon shorter'))
    # # READ CONTENTs OF /STATIC/DATA
    # #mypath = "static/data"
    # #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    # #s = {"nodes": onlyfiles, "links":["test1.txt","test2txt"]}
    # #s= [{"project":"ppi",	"data":{"nodes":["mol.txt","disease"],"links":["ppiLinks.txt","nothing","huso","aaaaaaaaREEE"]}},{"project":"FFFFt","data":{"nodes":["Airports"],"links":["airporTlinks"]	}}]
    # print (r.content.decode("utf-8"))
    # return  r.content.decode("utf-8") #jsonify(status="success", data = s)

    
    
    
    
 # # GET NODELIST FROM FLASK DB   
# @app.route('/_GetDbNodeList/', methods=['POST'])
# def GetDbNodeList():
    # data = request.get_json()
    
    # path = "http://asimov.westeurope.cloudapp.azure.com:8887/api/layout/" + data["name"]

    # r = requests.get(path , auth=('steveballmer','code peaceful canon shorter'))
   
    # print("Loaded nodelist" +  data["name"])
    # return r.content.decode("utf-8")
 

 # # GET LinkLIST FROM FLASK DB   
# @app.route('/_GetDbLinkList/', methods=['POST'])
# def GetDbLinkList():
    # data = request.get_json()
    
    # path = "http://asimov.westeurope.cloudapp.azure.com:8887/api/edge/all"

    # r = requests.get(path , auth=('steveballmer','code peaceful canon shorter'))
    # print ("loadedLinklist")
    
    # return r.content.decode("utf-8")
 
 
 
# @app.route('/_GetDbLabelList/', methods=['POST'])
# def GetDbLabelList():
    # data = request.get_json()
    
    # path = "http://asimov.westeurope.cloudapp.azure.com:8887/api/label/" + data["name"]

    # r = requests.get(path , auth=('steveballmer','code peaceful canon shorter'))
    # print ("loadedLabellist")
    
    # return r.content.decode("utf-8")   
    
  




















  
# # JUST  SOME TEMPLATES...
    
# @app.route('/_request_json/', methods=['POST'])
# def read_json():
    # data =request.get_json()
    # # READ A TEXTFILE
    # if data["type"] == "requestTxt":
        # with  app.open_resource('static/data/nodelist.txt')  as json_file:
            # data = json.load(json_file)

    # return jsonify(status="success", data = data)

    
    
    
# #RECEIVE JSON POST FROM INDEX HTML (JS), PARSE AND RETURN IT
# @app.route('/_receive_json/', methods=['POST'])
# def receive_json():
    # data =request.get_json()
    # responsestring = ""

   
    # if len(data["nodes"]) > 0 :
        # responsestring = "received nodelist with " + str(len(data["nodes"])) + " entries"
    # # RECEIVE NODELIST
    # # key "v" is float array with 7 elements: x y z r g b a
        # print("X: ", data["nodes"][0]["v"][0] , " Y: ", data["nodes"][0]["v"][1], " Z: ", data["nodes"][0]["v"][2])
    # # key "a" is a stringarray of variable size
        # print(data["nodes"][1]["a"][0])
       
      
    # else:
        # responsestring = "received invalid nodelist"

    # # if data["type"] == "nodes":
        # #
     # #BAD REQUEST
    # # else:
        # # responsestring = "received bad request. no route for type " + data["type"]
    # #print(type(data))

    # # for key in data.keys():
     # #print(key)
    # print(responsestring)
    # return jsonify(status="success", data = responsestring)

    
# ######################################################    
    