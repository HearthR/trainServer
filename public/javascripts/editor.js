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
    var s = new Node(attr[2]);
    selected.push(s);
    var length = selected.length;
    document.getElementById('station-list-selected').innerHTML += `<button onclick='selectedRemove(this)'>${selected[length-1].name}</button>`;
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
    let test = new Node();

    if(test) console.log(test);
    let msvg = document.querySelector("#metro > svg");
    if(msvg) {
        msvg.remove();
    }
    render();
};



