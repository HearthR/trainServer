var selected = [];
var selectedObj;


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#render-update").addEventListener("click", renderEvent);
    document.querySelector("#set-confirm").addEventListener("click", setCoordinate);
});


const selectedRemove = function(d) {
    let clickedName = d.textContent.split('(')[0];
    for(let i in selected) {
        if(selected[i].name === clickedName) {
            selected.splice(i,1);
            if(selected.length === 0) displayConfig(null);
            else if(i === selected.length) displayConfig(selected[selected.length - 1]);
            break;
        }
    }
    d.remove();
};

const isDuplicated = function(nodeId) {
    for(let i in selected) {
        if(selected[i].id === nodeId) {
            return true;
        }
    }
    return false;
};

const selectEvent = function(d) {
    let attr = d.textContent.split(" ");
    if(!isDuplicated(attr[0])) {
        let coord_t = {x : Number(attr[4]), y : Number(attr[6])};
        var s = new Node(attr[2], attr[0], Number(attr[1][0]), coord_t);
        selected.push(s);
        let length = selected.length;
        document.getElementById('station-list-selected').innerHTML += `<button onclick='selectedRemove(this)'>${selected[length-1].name}(${selected[length-1].metroLine})</button>`;
        displayConfig(s);
        selectedObj = d;
    }
};

const displayConfig = function(s) {
    let currentConfig = document.getElementById('set-selected');
    let currentConfigX = document.querySelector('#set-coordx > input');
    let currentConfigY = document.querySelector('#set-coordy > input');
    if(s) {
        currentConfig.innerHTML = `${s.id} ${s.metroLine}호선 ${s.name}<br>X:${s.coord.x} Y:${s.coord.y}`;
        currentConfigX.value = s.coord.x;
        currentConfigY.value = s.coord.y;
    }
    else {
        currentConfig.innerHTML = `0000 0호선 00<br>X:0 Y:0`;
        currentConfigX.value = 0;
        currentConfigY.value = 0;
    }
};

const searchStation = function(d) {
    let filter = d.value;
    let contents = document.getElementsByClassName("station-list-content");
    let txtValue;

    for(let i = 0; i < contents.length; i++) {
        txtValue = contents[i].textContent;
        if(txtValue.indexOf(filter) > -1) {
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
    let currentConfig = selected[selected.length-1];

    if(selected[selected.length-1]) {
        param_xy.id = currentConfig.id;
        param_xy.coord_x = x;
        param_xy.coord_y = y;
        axios.post("http://localhost:3000/editor", param_xy)
        .then(function(response) {
            if(response.status === 200) {
                currentConfig.coord.x = x;
                currentConfig.coord.y = y;
                displayConfig(currentConfig);
                selectedObj.innerHTML = `${currentConfig.id} ${currentConfig.metroLine}호선 ${currentConfig.name}<br> X: ${currentConfig.coord.x} Y: ${currentConfig.coord.y}`;
                console.log(response);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
};