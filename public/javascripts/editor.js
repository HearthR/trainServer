var selected = [];


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#render-update").addEventListener("click", renderEvent);
    document.querySelector("#set-confirm").addEventListener("click", setCoordinate);
});


const selectedRemove = function(d) {
    for(let i = 0; i < selected.length; i++) {
        if(selected[i].Name === d.textContent) {
            selected.splice(i,1);
            break;
        }
    }
    d.remove();
};

const selectEvent = function(d) {
    var attr = d.textContent.split(" ");
    var s = new Node(attr[2], attr[0], Number(attr[1][0]));
    selected.push(s);
    var length = selected.length;
    document.getElementById('station-list-selected').innerHTML += `<button onclick='selectedRemove(this)'>${selected[length-1].name}</button>`;
    displayConfig(s);
};

const displayConfig = function(s) {
    var current_config = document.getElementById('set-selected');
    current_config.innerHTML = `${s.id} ${s.metroLine}호선 ${s.name}<br>X:${s.coord.x} Y:${s.coord.y}`;
};

const searchStation = function(d) {
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


const renderEvent = function() {
    let msvg = document.querySelector("#metro > svg");
    if(msvg) {
        msvg.remove();
    }
    render();
};


const setCoordinate = () => {
    let x = document.querySelector("#set-coordx > input").value;
    let y = document.querySelector("#set-coordy > input").value;

    let param_xy = {};

    if(selected[selected.length-1]) {
        param_xy.id = selected[selected.length-1].id;
        param_xy.coord_x = x;
        param_xy.coord_y = y;
        axios.post("http://localhost:3000/editor", param_xy)
        .then(function(response) {
            if(response.status === 200) {
                selected[selected.length-1].coord.x = x;
                selected[selected.length-1].coord.y = y;
                displayConfig(selected[selected.length-1]);
                console.log(response);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
};