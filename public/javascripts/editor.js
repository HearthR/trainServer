var selected = [];
var selectedAll = [];
var selectedObj;


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#render-update").addEventListener("click", renderEvent);
    document.querySelector("#set-confirm").addEventListener("click", setCoordinate);
    let listButtonAll = document.querySelectorAll(".station-list-content");
    listButtonAll.forEach((listButton) => {
        let attr = listButton.textContent.split(" ");
        let coord_t = {x : Number(attr[4]), y : Number(attr[6])};
        let coord2_t = {x : Number(attr[9].split("(")[1].split(",")[0]), y : Number(attr[9].split(",")[1].split(")")[0])};
        var n = new Node(attr[2], attr[0], attr[1], coord_t, coord2_t);
        selectedAll.push(n);
        listButton.innerHTML += " #" + String(selectedAll.length-1);
    });
    listButtonAll.forEach((listButton) => {
        let attr = listButton.textContent.split(" ");
        let selectedAllIndex = Number(attr[10].split("#")[1]);
        let neighbors = attr[8].split(",");
        let neighborIndex = 0;
        for(let i = 0; i < selectedAll.length; i++) {
            if(selectedAll[i].id == neighbors[neighborIndex].split("/")[0]) {
                let neighborObj = {};
                neighborObj.node = selectedAll[i];
                neighborObj.cost = Number(neighbors[neighborIndex].split("/")[1]);
                selectedAll[selectedAllIndex].addNeighbor(neighborObj);
                neighborIndex += 1;
            }
            if(neighborIndex == neighbors.length) break;
        }
    });
});


const selectedRemove = function(d) {
    let clickedName = d.textContent.split(' ')[1].split('(')[0];
    for(let i in selected) {
        if(selected[i].name === clickedName) {
            d.remove();
            selected.splice(i,1);
            if(selected.length === 0) {
                displayConfig(null);
                selectedObj = null;
            }
            else if(i == selected.length) {
                let currentConfig = selected[selected.length - 1];
                let objIndex = document.querySelectorAll("#station-list-selected > button");
                objIndex = objIndex[objIndex.length - 1].textContent.split(' ')[0].split('#')[1];

                displayConfig(currentConfig);
                selectedObj = document.querySelectorAll(".station-list-content")[objIndex];
            }
            break;
        }
    }
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
        for(let i in selectedAll) {
            if(selectedAll[i].id === attr[0]) {
                selected.push(selectedAll[i]);
                let lastSelected = selected[selected.length - 1];
                document.getElementById('station-list-selected').innerHTML += `<button onclick='selectedRemove(this)'>${attr[9]} ${lastSelected.name}(${lastSelected.metroLine[0]})</button>`;
                displayConfig(lastSelected);
                selectedObj = d;
            }
        }
    }
};

const displayConfig = function(s) {
    let currentConfig = document.getElementById('set-selected');
    let currentConfigX = document.querySelector('#set-coordx > input');
    let currentConfigY = document.querySelector('#set-coordy > input');
    if(s) {
        currentConfig.innerHTML = `${s.id} ${s.metroLine} ${s.name}<br>X:${s.coord.x} Y:${s.coord.y}`;
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

    if(selected.length) {
        render(selected);
    }
    else {
        render(selectedAll);
    }
};

const setCoordinate = () => {
    let x = document.querySelector("#set-coordx > input").value;
    let y = document.querySelector("#set-coordy > input").value;

    let param_xy = {};
    let currentConfig = selected[selected.length-1];

    if(selected[selected.length-1]) {
        if(x[0] === "^") {
            param_xy.column = "coord2";
            param_xy.id = currentConfig.id;
            param_xy.coord_x = x.split("^")[1];
            param_xy.coord_y = y.split("^")[1];
            axios.post("http://ec2-54-180-115-171.ap-northeast-2.compute.amazonaws.com:3000/editor", param_xy)
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        else {
            param_xy.column = "coord";
            param_xy.id = currentConfig.id;
            param_xy.coord_x = x;
            param_xy.coord_y = y;
            axios.post("http://ec2-54-180-115-171.ap-northeast-2.compute.amazonaws.com:3000/editor", param_xy)
            .then(function(response) {
                if(response.status === 200) {
                    currentConfig.coord.x = x;
                    currentConfig.coord.y = y;
                    displayConfig(currentConfig);
                    let selectedAllIndex = selectedObj.textContent.split(" ")[9];
                    let neighborsText = selectedObj.textContent.split(" ")[8];
                    selectedObj.innerHTML = `${currentConfig.id} ${currentConfig.metroLine} ${currentConfig.name}<br> X: ${currentConfig.coord.x} Y: ${currentConfig.coord.y}<br> 연결: ${neighborsText} ${selectedAllIndex}`;
                    console.log(response);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
};

const getRandomPairs = (num) => {
    axios.get('/editor/random?num='+String(num))
    .then( response => {
        let tmp = response.data.split(" ");
        let pairList = [];
        let indexPairList = [];
        for(let i = 0; i < tmp.length - 1; i++) {
            let element = {};
            element.ID_from = tmp[i].split(",")[0];
            element.ID_to = tmp[i].split(",")[1];
            pairList.push(element);
        }

        for(let i = 0; i < pairList.length; i++) {
            let indexObj = {};
            indexObj.from = getIndexFromId(pairList[i].ID_from);
            indexObj.to = getIndexFromId(pairList[i].ID_to);
            indexPairList.push(indexObj);
        }
        getPaths(indexPairList);
    });
};

const getPaths = (indexPair) => {
    let pathList = [];
    for(let i = 0; i < indexPair.length; i++) {
        pathList.push(findPath(selectedAll[indexPair[i].from], selectedAll[indexPair[i].to]));
    }

    console.log(pathList);
};

const getIndexFromId = (id) => {
    for(let i = 0; i < selectedAll.length; i++) {
        if(id == selectedAll[i].id) return i;
    }
};
