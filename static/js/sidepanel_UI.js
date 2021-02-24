
    
/////// HERE ARE BUTTON MAPPINGS FROM HTML FILE
/////// AND CALLS TO FLASK AND VRNetzer_API
// add MAPPINGS TO UI ELEMENTS HERE //

$(document).ready(function () {

    $(function () {
        $("#tabsSide").tabs();
    });
    
    $(function () {
        $("#savedSessions").selectmenu();

    });

    $('#savedSessions').on('selectmenuselect', function () {
        var name = $('#savedSessions').find(':selected').text();
        logger(name);
		GetDbLoadResults(name);
       

    });

   
	
    
 
    $(function () {
        $("#pslider-restart_probability").slider({
            animate: true,
            range: "max",
            min: 1,
            max: 100,
            value: 20,
            slide: function (event, ui) {
                var restartLabel = "RESTART PROBABILITY: " + $("#pslider-restart_probability").slider("value") / 100;
                $("#prestart_label").html(restartLabel);
            }
        });
        // var restartLabel = "RESTART PROBABILITY: " + $("#slider-restart_probability").slider("value")
        $("#prestart_label").val($("#pslider-restart_probability").slider("value"));
    });

    $(function () {

        $("#p_rw_start").button();
        $("#p_rw_start").click(function (event) {
            event.preventDefault();
            //var span_Text = document.getElementById("restart_probability").innerText;
            var restartpr = $("#pslider-restart_probability").slider("value") / 100;
            var json = {
                restart_probability: restartpr,
                max_elements: 200,
                node_ids: [],
                variants: []
            }

            var seedbuttons = $("#seedbox :button");

            for (var i = 0; i < seedbuttons.length; i++) {
                json.node_ids.push(seedbuttons[i].id);
            }

            var varbuttons = $("#pvariantbox :button");

            for (var i = 0; i < varbuttons.length; i++) {
                json.variants.push(varbuttons[i].id);
            }

            /////logger(json)
            juliaRw(json);
            //ue4("StartRandomWalk", restartpr);

            //reloadForceLayout (inputdata1);
        });
    });
    
    
    $(function () {
        $("#savePanel").button();
        $("#savePanel").click(function (event) {
            event.preventDefault();
            ///logger(rwJuliaResponse);

            
            // 
			CollectDashBoardData();
			
			dashboardData.filename = "test222"

			logger(dashboardData);
            SavePanelData(dashboardData);
			//ActivateVRkeyboard("saveResults");
        });
    });
    
 
    
    $(function () {
        $("#pphensearch").button();
        $("#pphensearch").click(function (event) {
            event.preventDefault();
            var buttons = $("#pphenobox :button");
            var urlstring = "attribute_id=";
            for (var i = 0; i < buttons.length; i++) {
                urlstring = urlstring + buttons[i].id;
                if (i < (buttons.length - 1)) {
                    urlstring = urlstring + "&attribute_id=";
                }

                //urlstring.concat("&attribute_id=");
                /////logger(buttons[i].value);
            }
            ///logger(urlstring);
            GetNodesForAttributes(urlstring);
        });
    });

    //SEND PHENOTYPE TO JULIA BOARD

    $(function () {
        $("#pphenclear").button();
        $("#pphenclear").click(function (event) {
            event.preventDefault();
            $("#pphenobox").empty();
            // ///logger(json);
        });
    });

    //SEND PHENOTYPE TO JULIA BOARD

    $(function () {
        $("#addAttr").button();
        $("#addAttr").click(function (event) {
            event.preventDefault();
            var json = {
                target: "sidepanel1",
                funkt: "addPhen",
                nodes: [{
                        name: $("#searchInput1").text(),
                        id: $("#searchInput1").attr("searchID")
                    }
                ]
            };
            ue4("ui", json);
            // ///logger(json);
        });
    });

    ///////INIT HERE

    $("#pspinner_load").hide();

    $(function () {
        $("#addMyGene").button();
        $("#addMyGene").click(function (event) {
            event.preventDefault();
            //var json = {target:"sidepanel1", funkt:"addPhen", nodes:[{name: $("#searchInput1").text() , id: $("#searchInput1").attr("searchID")}]};
            ue4("addMyGene", "trigger");
            // ///logger(json);
        });
    });

    $(function () {
        $("#p_clear_seedbox").button();
        $("#p_clear_seedbox").click(function (event) {
            event.preventDefault();
            //var json = {target:"sidepanel1", funkt:"addPhen", nodes:[{name: $("#searchInput1").text() , id: $("#searchInput1").attr("searchID")}]};
            $("#seedbox").empty();
            // ///logger(json);
        });
    });

    $(function () {
        $("#p_add_to_seedbox").button();
        $("#p_add_to_seedbox").click(function (event) {
            event.preventDefault();
            //var json = {target:"sidepanel1", funkt:"addPhen", nodes:[{name: $("#searchInput1").text() , id: $("#searchInput1").attr("searchID")}]};
            ue4("GetSeedsFromSelection", "trigger");
            // ///logger(json);
        });
    });



    //Todo: Needs to be notified from main UI !!!
	
	GetDbResultsNames();
	populateSidePanel (dashboardData);
    //GetDbFileNames1();
 

});


function GetDbResultsNames() {
    
    //var requestTxt = {"name": name};
    //payload = JSON.stringify(requestTxt)
    path = dbprefix + '/api/ppi/import/results';
    //logger(path);
    $.ajax({
        type: "GET",
        url: path,
        contentType: "application/json",
        //data: payload,
        headers: {
            "Authorization": "Basic " + btoa(dbuser + ":" + dbpw)
        },
        dataType: "json",
        success: function (response) {
            logger(response);
            // POPULATE UI DROPDOWN

            dbdata = response.filename.slice(); //DEEP COPY !!!!
            logger(dbdata)
            $('#savedSessions').find('option').remove().end();
            $('#savedSessions').selectmenu('destroy').selectmenu({
                style: 'dropdown'
            });

            response.filename.forEach(function (item) {
                $('#savedSessions').append($('<option>', {
                        value: item,
                        text: item
                    }));
            });

             
            $("#savedSessions").selectmenu("refresh");

            

        },

        error: function (err) {
            logger(err);

        }
    });
    //event.preventDefault();

}


function GetDbLoadResults(name) {
    
    //var requestTxt = {"name": name};
    //payload = JSON.stringify(requestTxt)
    path = dbprefix + "/api/ppi/import/resultsfilename?fname='" + name +"'";
    //logger(path);
    $.ajax({
        type: "GET",
        url: path,
        contentType: "application/json",
        headers: {
            "Authorization": "Basic " + btoa(dbuser + ":" + dbpw)
        },
        dataType: "json",
        success: function (response) {
            logger(response);
            // POPULATE PAGE
			populateSidePanel(response);
            

        },

        error: function (err) {
            logger(err);

        }
    });
    //event.preventDefault();

}


function SavePanelData(data) {

    payload = JSON.stringify(data);
    logger(data);
 
    path = dbprefix + "/api/ppi/export/results";
    /////logger(path);
        $.ajax({
        type: "POST",
        url: path,
        contentType: "application/json",
        data: payload,
        dataType: "json",
        headers: {
            "Authorization": "Basic " + btoa(dbuser + ":" + dbpw)
        },
        success: function (response) {

            logger(response);
        },
        error: function (err) {
            logger(err);
            ///logger(data);
        }
    });

}

function CollectDashBoardData(){

            // collect dashboarddata here
			//dashboardData.filename = "1234name"
            dashboardData.pname = "get name";
            dashboardData.pdata = "......";
            dashboardData.pcomments = "blablabal";
            //dashboardData.rw = rwJuliaResponse;

            var myGenebuttons = $("#MyNodesbox :button");

            for (var i = 0; i < myGenebuttons.length; i++) {
                var thisnode = {"node_id": myGenebuttons[i].id, "symbol":myGenebuttons[i].value};
                
               dashboardData.myNodes.push(thisnode);
               
            }
}

function populateSidePanel (data){
	
	logger(data.rw);
    reloadForceLayout(data.rw);
    drawBarChart(data.rw.nodes);


    $("#pname").text(data.pname);
    $("#page").text(data.pdata);
    $("#pcomments").text(data.pcomments);

    for (var i = 0; i < 100 && i < data.phenotypes.length; i++) {

        createButton(data.phenotypes[i].name, data.phenotypes[i].id, "pphenobox");

    }

    for (var i = 0; i < 200 && i < data.seeds.length; i++) {
        createButton(data.seeds[i].symbol, data.seeds[i].node_id, "seedbox");

    }

    for (var i = 0; i < 100 && i < data.variants.length; i++) {

        createButton(data.variants[i].symbol, data.variants[i].node_id, "pvariantbox");

    }
}