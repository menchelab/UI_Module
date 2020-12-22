#UI Server

what should be here:

API Reference




Tutorials

The DataDiVR platform consists of 4 Modules:



VRnet - the virtual reality module written in Unreal Engine

UiServer - a jQuery and html website 

DataServer - a Flask/Python webserver 

SQL database

for a quick start, you can just download the VRnet executable and run it on your windows computer with a SteamVR compatible headset.
It comes preconfigured to connect to the other modules on our server.

However, if you want to implement your own datasets and functionality you can also run everything localy on your machine or network.
Here is a step by step guide how to do this on a windows computer. 

1.) Set up a MySql Database

    Download and install the free version from: URL
    Download and install MySql Workbench
    Download the dump file of our database from
    Create a new database, user and password and upload dump file

    you have now a clone of our database on your local machine.

2.) Clone the DataServer repository into a new folder somwhere on your computer called "DataDiVR"

    install python >3.6, make sure its added to path variable
    install pip for python

    edit DataDiVR/DataServer/db_config.py to match the database host and user you created before and save

    right click on DataDiVR/DataServer/runDataSerVR.ps1 -> "run with power shell"
    if the output of the console window that just opened ends with "Running on http://127.0.0.1:1337/"
    you are good to go, if there are errors you will need to install dependencies.

3.) Clone the UiServer repository into "DataDiVR"

    install python >3.6, make sure its added to path variable 
    install pip for python
    edit DataDiVR/uiserver/static/js/DataServerConfig.js and set "dbprefix" to the address of your dataServer , here: 'http://127.0.0.1:1337' and save.

    right click on DataDiVR/UiServer/runUIServer.ps1 -> "run with power shell"
    if the output of the console window that just opened ends with "Running on http://127.0.0.1:5000/"
    you are good to go, if there are errors you will need to install dependencies.
    
4.) Download the VRnet executable and extract it to "DataDiVR"

    edit DataDiVR/VRnet/viveNet/Content/data/UiServerConfig.txt
    run viveNet.exe
    