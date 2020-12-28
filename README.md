## **DataDiVR Architecture Overview**

The **DataDiVR** platform consists of 4 Modules:

![alt text](static/img/tutorial/architecture.png "Title Text")

### **VRnet** - the virtual reality module written in Unreal Engine

### **UiServer** - a jQuery and html website 

### **DataServer** - a Flask/Python webserver 

### **SQL database**


## **Hardware Requirements**

 We are running the platform on an MSI gaming laptop with the following specs:
 - CPU: i7 - 7820HK
 - RAM: 16 GB
 - GPU: NVIDEA 1070 TI

 and a VR HEADSET - we tested the following:
 - HTC VIVE VR Headset + controllers
 - OCULUS QUEST + controllers

## **Installation: Quick Start**

for a quick start, you can just [download the VRnet executable](url) and run viveNet.exe on your windows computer with a SteamVR compatible headset.
It comes preconfigured to connect to the other modules that we already installed on our server to make it easy for you to get a first impression.

## **Installation: Stand Alone**

However, if you want to implement your own datasets and functionalities you can also run everything localy on your machine or network.
Here is a step by step guide how to do this on a windows computer. Note that the dataServer and the UiServer module can also run a (linux) server,
while the VRnet module needs to run on a windows machine as gaming hardware is required for Virtual Reality

### **1.) Set up a MySql Database**

- download and install the free version from: URL
- download and install [MySql Workbench](https://dev.mysql.com/downloads/workbench/)
- download the .dump file of our database [from here](url)
- Create a new database, user and password and upload .dump file to it

you have now a clone of our database on your local machine.

### **2.) Clone the [DataServer repository](url)** into a new folder somwhere on your computer called "DataDiVR"

- install [python >3.6,](https://www.python.org/downloads/) make sure its added to path variable
- install [pip](https://pypi.org/project/pip/) for python

- edit DataDiVR/DataServer/db_config.py to match the database host and user you created before and save

- right click on DataDiVR/DataServer/runDataSerVR.ps1 -> "run with power shell"
- if the output of the console window that just opened ends with "Running on http://127.0.0.1:1337/"
you are good to go, if there are errors you will need to install dependencies.

### **3.) Clone the [UiServer repository](url)** into "DataDiVR"

- install [python >3.6,](https://www.python.org/downloads/) make sure its added to path variable
- install [pip](https://pypi.org/project/pip/) for python
- edit DataDiVR/uiserver/static/js/DataServerConfig.js and set "dbprefix" to the address of your dataServer , here: 'http://127.0.0.1:1337' and save.

- right click on DataDiVR/UiServer/runUIServer.ps1 -> "run with power shell"
- if the output of the console window that just opened ends with "Running on http://127.0.0.1:5000/"
you are good to go, if there are errors you will need to install dependencies.
    
### **4.) Download the [VRnet executable](url)** and extract it to "DataDiVR"
- if you haven't already, make a Steam account and install [SteamVR](https://store.steampowered.com/app/250820/SteamVR/) and test your headset
- edit DataDiVR/VRnet/viveNet/Content/data/UiServerConfig.txt and change the address to the one where your UIServer is, here http://127.0.0.1:5000/ 
- run viveNet.exe


## **VRnet API Documentation**

The following function calls are sent from jQuery to the VR module.

The syntax looks like this:

`ue4("rw_result", response);`

where "rw_results" is the functionname and "response" the parameters.

This list is incomplete and will grow in the future.

| function | parameters | type | discription |
| ------ | ------ |  ------ |  ------ | 
| LoadDbNodeList | nodelist object | json  | loads a nodelist into channel A of the layout | 
| LoadDbNodeListB |nodelist object | json  | loads a nodelist into channel B of the layout (only xyz, no colors) | 
| LoadDbLinkList | linklist object | json  | loads a linklist from db | 
| LoadDbLabelList |  labellist object | json  | loads a labellist for channel A of the layout | 
| LoadDbLabelListB | labellist object | json  | loads a labellist for channel B of the layout |
| Init | --- | --- | start initialization routine, OnDocumentReady()  |
| Morph | "A" or "B" | string | Morph between layout channel A and B |
| loadSelection | name | string | Depreached Load selection from csv file |
| GetSelection |  { "content": "Name","route": "saveSelection"} | json  | Get active selection and do different things depending on route (save it on db in this case) | 
| SetScale | value | float | set Network Scale  | 
| SetNodeSize | value | float | set Network SetNodeSize (linksize is also affected by this)  |
| SetLinkSize | value | float | set Network SetLinkSize ATTENTION: big diameters cause lag  |
| SetLinkAlpha | value | float | set Network Link transperancy  |
| SetLight | value | float | set scene light intensity |
| shortestPathPoint | "p1" or "p2" |  string | get selected node ID from VR and define it either as start or endpoint | 
| exitIsolate | --- |  --- | exit Isolate Selection Mode (show all links) | 
| rw_result | rw object | json  | display the random walk results in VR | 
| julia | {"seeds":[{"node_id":123}...],"variants":[...],"linker":[...]} | json  | Gene Priorization example on sidepanel |
| activateNode | id | int | select and highlight single node in network | 
| reLayout | nodelist object | json   | show newly created layout of subset in VR (this resorts the linklist) |
| VRkeyboard | route |  string | opens a keyboard in VR - after user presses ENTER, typed string is returned to a .js function by the same name as route - so you need to create this | 
 