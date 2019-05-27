var selectedAll = [];
var selectMode = false;
var focusedLine = "";


document.addEventListener('DOMContentLoaded', () => {
    axios.get('/data/stations')
    .then(res => {
        let stationData = res.data;

        for(let i = 0; i < Object.keys(stationData).length; i++) {
            var tempNode = new Node(stationData[i].Name, String(stationData[i].ID), String(stationData[i].line_num)+"호선", stationData[i].coord, stationData[i].coord2);
            selectedAll.push(tempNode);
        }

        
        axios.get('/data/neighbors')
        .then(res => {
            let neighborData = res.data;
            let fromIdx = 0;
            let toIdx = 0;

            for(let i = 0; i < selectedAll.length; i++) {
                for(let j = fromIdx; j < Object.keys(neighborData).length; j++) {
                    if(neighborData[j].ID_from == selectedAll[i].id) {
                        for(let k = toIdx; k < selectedAll.length; k++) {
                            if(selectedAll[k].id == neighborData[j].ID_to) {
                                let neighborObj = {};
                                neighborObj.node = selectedAll[k];
                                neighborObj.cost = Number(neighborData[j].Cost);
                                neighborObj.congestion = Number(neighborData[j].Congestion);
                                selectedAll[i].addNeighbor(neighborObj);
                                toIdx = k + 1;
                                break;
                            }
                        }
                        fromIdx += 1;
                    }
                    else {
                        toIdx = 0;
                        break;
                    }
                }
            }

            render(selectedAll);
        });
    });

    document.querySelector("#search-path").addEventListener("click", searchPath);
    document.querySelector("#mode-select-normal > button").addEventListener("click", selectNormal);
    document.querySelector("#mode-select-congestion > button").addEventListener("click", selectCongestion);
    // document.querySelectorAll(".line-selector").forEach(element => {
    //     element.addEventListener("click", selectLine);
    // });

});

const searchPath = () => {
    disablePath();
    let src = document.querySelector("#input-path-src > input").value;
    let dst = document.querySelector("#input-path-dst > input").value;

    if(src && dst) {
        let srcNode, dstNode;

        for(let i in selectedAll) {
            if(!srcNode && src == selectedAll[i].name) {
                srcNode = selectedAll[i];
            }
            if(!dstNode && dst == selectedAll[i].name) {
                dstNode = selectedAll[i];
            }
        }
    
        renderPath(srcNode, dstNode);
    }

};

const stAutoComplete = (inp, stationArr) => {
    let currentIdx;
    inp.addEventListener("input", (e) => {
        let a, tmpDiv;
        let val = this.value;

        closeLists();

        if(!val) {
            return false;
        }

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for(let i in stationArr) {

        }

    });
};

const selectNormal = () => {
    if(selectMode) {
        disableCongestion();
        document.querySelector("#mode-select-congestion > button").setAttribute("class", "mode-select-button");
        document.querySelector("#mode-select-normal > button").setAttribute("class", "mode-select-button selected");
        selectMode = false;
    }
};

const selectCongestion = () => {
    if(!selectMode) {
        renderCongestion();
        document.querySelector("#mode-select-congestion > button").setAttribute("class", "mode-select-button selected");
        document.querySelector("#mode-select-normal > button").setAttribute("class", "mode-select-button");
        selectMode = true;
    }
};

const selectLine = (element) => {
    let lineNum = element.textContent;
    disableFocus();

    if(focusedLine != lineNum) {
        console.log(lineNum);
        let lineArr = selectedAll.filter(n => {return n.metroLine == lineNum;});
        let elements = document.querySelectorAll(".line-selector");
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].textContent != lineNum) {
                elements[i].setAttribute("class", "line-selector fade-out");
            }
            else {
                elements[i].setAttribute("class", "line-selector");
            }
        }

         focusNodes(lineArr);
         focusedLine = lineNum;
    }
    else {
        let elements = document.querySelectorAll(".line-selector");
        elements.forEach(element => {
            element.setAttribute("class", "line-selector");
        });
        focusedLine = "";
    }


};

// const getPairs = () => {
//     axios.get('/pairs')
//     .then(res => {
//         let pairList = res.data;
//         let pairToIndex = [];
//         let pathList = {};
        
//         for(let i in pairList) {
//             if(i % 10000 === 0 || i == pairList.length - 1) console.log("Processing pairToIndex..." + String(i) + "/" + String(pairList.length - 1));
//             let tmpObj = {};
//             tmpObj.cost = pairList[i].Total;
//             for(let j in selectedAll) {
//                 if(selectedAll[j].id == pairList[i].ID_from) {
//                     tmpObj.fromIdx = j;
//                 }
//                 if(selectedAll[j].id == pairList[i].ID_to) {
//                     tmpObj.toIdx = j;
//                 }
//             }
//             pairToIndex.push(tmpObj);
//         }

//         for(let i in pairToIndex) {
//             if(i % 10000 === 0 || i == pairToIndex.length - 1) console.log("Processing pathList..." + String(i) + "/" + String(pairToIndex.length - 1));
//             let tmpObj = {};
//             let path = findPath(selectedAll[pairToIndex[i].fromIdx], selectedAll[pairToIndex[i].toIdx]);
//             tmpObj.path = [];
//             for(let j in path) {
//                 tmpObj.path.push(path[j].id);
//             }
//             tmpObj.cost = pairToIndex[i].cost;
//             pathList[String(i)] = tmpObj;
//         }
        
//         console.log(JSON.stringify(pathList));
//     });
// };



