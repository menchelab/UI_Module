## **DataDiVR - A Virtual Reality Framework for Network Visualization and Analytics**

![alt text](static/img/tutorial/DataDiVR_Fig_1b_notext.png)

Performant visualization is key to discovering context in large graphs.

## **Hardware Requirements**

 We are running the platform on an MSI gaming laptop with the following specs:
 - CPU: i7 - 7820HK
 - RAM: 16 GB
 - GPU: NVIDIA 1070 TI
 - OS: WINDOWS 10

 and a VR HEADSET - we tested the following:
 - HTC VIVE VR Headset + controllers
 - OCULUS QUEST + controllers

## **Installation: Quick Start**

for a quick start, you can just [download the VRnet executable](url) and run viveNet.exe on your windows computer with a SteamVR compatible headset.
It comes preconfigured to connect to the other modules that we already installed on our server to make it easy for you to get a first impression. 
It has the ability to upload your own datasets, but we don't recommend it. **Do NOT upload any sensitive data  here**, this is **only for demonstration purposes** and for the whole world to see. We don't guarantee your data's safety! If you want to work with your own data you should+ continue to the next step.

## **Installation: Stand Alone**

However, if you want to implement your own datasets and functionalities, you can also **run everything localy on your machine (the SAFE option if you are dealing with sensitive data)** or run the DataServer and UIServer on a networkserver or cloud service (if you need scalability and processing power).
Here is a step by step guide how to do a local installation on a windows computer. Note that the dataServer and the UiServer module can also run a (linux) server,
while the VRnet module needs to run on a windows 10 machine as gaming hardware is required for Virtual Reality which is best supported under windows.

### **1.) Set up a MySql Database**

- download and install [MySql Workbench](https://dev.mysql.com/downloads/workbench/)
- download the .dump file of our database [from here](url)
- Create a new database, user and password and upload .dump file to it

you have now a clone of our database on your local machine.

### **2.) Clone the [DataServer repository](url)** into a new folder somwhere on your computer called "DataDiVR"

- install [python >3.6,](https://www.python.org/downloads/) make sure its added to path variable
- install [pip](https://pypi.org/project/pip/) for python

- edit DataDiVR/DataServer/db_config.py to match the database host and user you created before and save

- right click on DataDiVR/DataServer/runDataSerVR.ps1 -> "run with power shell"

![alt text](static/img/tutorial/runpowershell.png)

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

## **DataDiVR Architecture Overview**

The **DataDiVR** platform consists of 4 Modules:

![alt text](static/img/tutorial/architecture.png )

### **VRnet** - the virtual reality module written in Unreal Engine

Unreal Engine is one of the industry leaders in the videogame world. We chose it as the base for our VR Module for it's astounding graphics performance, continous support of upcoming VR hardware and becuase it's open source.

### **UiServer** - a jQuery and html website 

- **The UIServer is running in the browser of your local machine and can only SEND get and post requests TO the DataServer.**

Think of the UIServer as the frontend of a website and the DataServer as it's backend. 
A User clicks on a button on the frontend, this causes the UI Server to send a post request to a specific URL (route) on the backend (the DataServer), await it's response and finally display the result as text or as a graph.

The DataServer can only RESPOND to those requests, meaning the DataServer can never send something to the frontend without being asked.
Every communication is Initiated by the UIServer.

Now here is what's special about the UIServer:

 - **It can also SEND api function calls to the VR Module AND**

 - **It can RECEIVE calls from the VR Module** 

In contrast to the DataServer Module, the VR Module CAN initiate communication with the UIServer and call special functions set up in the UIServer.
This picture illustrates the different routes of communication in the framework. 

![alt text](static/img/tutorial/communication.png )


### **DataServer** - a Flask/Python webserver 

The DataServer is the backend and has 
- **separate routes (URLs) defined for each task**

When the UIServer sends a request to one of these, it parses the input parameters, performs calculations and maybee database queries and returns it's response to the UIServer.
- **it can run on the local machine or on a powerfull cloud server** if more power is needed

### **SQL database**

This is the data base schema:
![alt text](static/img/tutorial/dataserver_schema.png)


## **Tutorial 1: Using the Uploader to add your own network**

- right click on DataDiVR/DataServer/runDataSerVR.ps1 -> "run with power shell" to start the DataServer

- open the web frontend of the DataServer in a browser  http://127.0.0.1:1337/swimmer

![alt text](static/img/tutorial/swimmer.png)

- tick "Create Project" and choose a name that doesn't exist in the dropdown menu jet
- select .csv files to upload, [they must be formatted after these guidlines](#Csv-file-formats)
- restart the VRModule and load your project 


## **Tutorial 2: UIServer and DataServer**



## Csv file formats ##

**Node Lists** look like this, 

`8473,0.4993,0.4544,0.640,188,20,26,100,3dportrait`

where 

|8473|0.4993|0.4544|0.640|188|20|26|100|3dportrait|
|---|---|---|---|---|---|---|---|---|
|ID|X-Pos|Y-Pos|Z-Pos|R|G|B|A|Name|

Positions need to be normalised between 0 - 1

Colors RGBA range from 0 - 255 but A value's should be 100 as bigger values makes nodes glow

**Link Lists**

`1267,2945`

where

|1267|2945|
|---|---|
|Start|End|

for now, only one link list per project is supported

**Selection Lists**

```
1849
2455
4029
```
are a list of ID's separated by linebreaks


## **VRnet API Documentation**

The following function calls are sent from jQuery to the VR module.

The syntax looks like this:

### `ue4("rw_result", response);`

where "rw_results" is the functionname and "response" the parameters.

This list will grow in the future.

| function | parameters | type | discription |
| ------ | ------ |  ------ |  ------ | 
| LoadDbNodeList | nodelist object | json  | loads a nodelist into channel A of the layout | 
| LoadDbNodeListB |nodelist object | json  | loads a nodelist into channel B of the layout (only xyz, no colors) | 
| LoadDbLinkList | linklist object | json  | loads a linklist from db | 
| LoadDbLabelList |  labellist object | json  | loads a labellist for channel A of the layout | 
| LoadDbLabelListB | labellist object | json  | loads a labellist for channel B of the layout |
| Init | --- | --- | start initialization routine, OnDocumentReady()  |
| Morph | "A" or "B" | string | Morph between layout channel A and B |
| GetSelection |  { "content": "Name","route": "saveSelection"} | json  | Get active selection and do different things depending on route (save it on db in this case) | 
| SetScale | value | float | set Network Scale  | 
| SetNodeSize | value | float | set Network SetNodeSize (linksize is also affected by this)  |
| SetLinkSize | value | float | set Network SetLinkSize ATTENTION: big diameters cause lag  |
| SetLinkAlpha | value | float | set Network Link transperancy  |
| SetLight | value | float | set scene light intensity |
| ShortestPathPoint | "p1" or "p2" |  string | get selected node ID from VR and define it either as start or endpoint | 
| ExitIsolate | --- |  --- | exit Isolate Selection Mode (show all links) | 
| Rw_Result | rw object | json  | display the random walk results in VR | 
| Julia | {"seeds":[{"node_id":123}...],"variants":[...],"linker":[...]} | json  | Gene Priorization example on sidepanel |
| ActivateNode | id | int | select and highlight single node in network | 
| ReLayout | nodelist object | json   | show newly created layout of subset in VR (this resorts the linklist) |
| VRkeyboard | route |  string | opens a keyboard in VR - after user presses ENTER, typed string is returned to a .js function by the same name as route - so you need to create this | 
| loadSelection | name | string | Depricated Load selection from csv file |
 
