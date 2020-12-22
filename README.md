The **DataDiVR** platform consists of 4 Modules:


**- VRnet** - the virtual reality module written in Unreal Engine

**- UiServer** - a jQuery and html website 

**- DataServer** - a Flask/Python webserver 

**- SQL database**


**Hardware Requirements**

 We are running the platform on an MSI gaming laptop with the following specs:
 - CPU: i7 - 7820HK
 - RAM: 16 GB
 - GPU: NVIDEA 1070 TI

 and a VR HEADSET - we tested the following:
 - HTC VIVE VR Headset + controllers
 - OCULUS QUEST + controllers

**Installation: Quick Start**

for a quick start, you can just [download the VRnet executable](url) and run viveNet.exe on your windows computer with a SteamVR compatible headset.
It comes preconfigured to connect to the other modules that we already installed on our server to make it easy for you to get a first impression.

**Installation: Stand Alone**

However, if you want to implement your own datasets and functionalities you can also run everything localy on your machine or network.
Here is a step by step guide how to do this on a windows computer. Note that the dataServer and the UiServer module can also run a (linux) server,
while the VRnet module needs to run on a windows machine (gaming hardware required)

**1.) Set up a MySql Database**

- download and install the free version from: URL
- download and install [MySql Workbench](https://dev.mysql.com/downloads/workbench/)
- download the .dump file of our database from
- Create a new database, user and password and upload .dump file to it

you have now a clone of our database on your local machine.

**2.) Clone the DataServer repository** into a new folder somwhere on your computer called "DataDiVR"

- install [python >3.6,](https://www.python.org/downloads/) make sure its added to path variable
- install [pip](https://pypi.org/project/pip/) for python

- edit DataDiVR/DataServer/db_config.py to match the database host and user you created before and save

- right click on DataDiVR/DataServer/runDataSerVR.ps1 -> "run with power shell"
- if the output of the console window that just opened ends with "Running on http://127.0.0.1:1337/"
you are good to go, if there are errors you will need to install dependencies.

**3.) Clone the UiServer** repository into "DataDiVR"

- install [python >3.6,](https://www.python.org/downloads/) make sure its added to path variable
- install [pip](https://pypi.org/project/pip/) for python
- edit DataDiVR/uiserver/static/js/DataServerConfig.js and set "dbprefix" to the address of your dataServer , here: 'http://127.0.0.1:1337' and save.

- right click on DataDiVR/UiServer/runUIServer.ps1 -> "run with power shell"
- if the output of the console window that just opened ends with "Running on http://127.0.0.1:5000/"
you are good to go, if there are errors you will need to install dependencies.
    
**4.) Download the VRnet executable** and extract it to "DataDiVR"
- if you haven't already, make a Steam account and install [SteamVR](https://store.steampowered.com/app/250820/SteamVR/) and test your headset
- edit DataDiVR/VRnet/viveNet/Content/data/UiServerConfig.txt and change the address to the one where your UIServer is, here http://127.0.0.1:5000/ 
- run viveNet.exe
    