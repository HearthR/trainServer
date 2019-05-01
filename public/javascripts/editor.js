var selected = [];


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#render-update").addEventListener("click", renderEvent);
});


var selectedRemove = function(d) {
    for(let i = 0; i < selected.length; i++) {
        if(selected[i].Name === d.textContent) {
            selected.splice(i,1);
            break;
        }
    }
    d.remove();
};

var selectEvent = function(d) {
    var attr = d.textContent.split(" ");
    var s = new Node(attr[2], attr[0], Number(attr[1][0]));
    selected.push(s);
    var length = selected.length;
    document.getElementById('station-list-selected').innerHTML += `<button onclick='selectedRemove(this)'>${selected[length-1].name}</button>`;
    var current_config = document.getElementById('set-selected');
    current_config.innerHTML = `${s.id} ${s.metroLine}호선 ${s.name}<br>X:${s.coord.x} Y:${s.coord.y}`;
};

var searchStation = function(d) {
    var filter = d.value;
    var contents = document.getElementsByClassName("station-list-content");
    var txtvalue;

    for(let i = 0; i < contents.length; i++) {
        txtvalue = contents[i].textContent;
        if(txtvalue.indexOf(filter) > -1) {
            contents[i].style.display = "";
        }
        else {
            contents[i].style.display = "none";
        }
    }
};


var renderEvent = function() {
    let msvg = document.querySelector("#metro > svg");
    if(msvg) {
        msvg.remove();
    }
    render();
};



