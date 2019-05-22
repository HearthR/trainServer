var selectedAll = [];
var test;

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

});

