var selected = [];

class Station {
    constructor(ID, Line, Name) {
    this.ID = ID;
    this.Line = Line;
    this.Name = Name;
    this.x = 0; //todo
    this.y = 0; //todo
    }
}

var selected_remove = function(d) {
    for(var i = 0; i < selected.length; i++) {
    if(selected[i].Name === d.textContent) {
        selected.splice(i,1);
        break;
    }
    }
    d.remove();
};

var select_event = function(d) {
    var attr = d.textContent.split(" ");
    var s = new Station(attr[0], attr[1], attr[2]);
    selected.push(s);
    var length = selected.length;
    document.getElementById('station-list-selected').innerHTML += "<button onclick='selected_remove(this)'>"+selected[length-1].Name+"</button>";
};

var search_station = function(d) {
    var filter = d.value;
    var contents = document.getElementsByClassName("station-list-content");
    var txtvalue;

    for(var i = 0; i < contents.length; i++) {
    txtvalue = contents[i].textContent;
    if(txtvalue.indexOf(filter) > -1) {
        contents[i].style.display = "";
    }
    else {
        contents[i].style.display = "none";
    }
    }
};