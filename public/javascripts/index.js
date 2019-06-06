var stationNodes = [];
var selectMode = false;
var focusedLine = "";
var stations = ["가능", "가락시장", "가산디지털단지", "가양", "간석", "강남", "강남구청", "강동", "강동구청", "강변", "개롱", "개봉", "개화", "개화산", "거여", "건대입구", "경마공원", "경복궁", "경찰병원", "고덕", "고려대", "고속터미널", "고잔", "공덕", "공릉", "공항시장", "과천", "관악", "광나루", "광명", "광명사거리", "광운대", "광화문", "광흥창", "교대", "구로", "구로디지털단지", "구반포", "구산", "구의", "구일", "구파발", "국회의사당", "군자", "군포", "굴포천", "굽은다리", "금정", "금천구청", "금호", "길동", "길음", "김포공항", "까치산", "까치울", "낙성대", "남구로", "남부터미널", "남성", "남영", "남태령", "남한산성입구", "내방", "노들", "노량진", "노원", "녹번", "녹사평", "녹양", "녹천", "논현", "단대오거리", "답십리", "당고개", "당산", "당정", "대곡", "대공원", "대림", "대방", "대야미", "대청", "대치", "대화", "대흥", "덕계", "덕정", "도곡", "도림천", "도봉", "도봉산", "도원", "도화", "독립문", "독바위", "독산", "돌곶이", "동대문", "동대문역사문화공원", "동대입구", "동두천", "동두천중앙", "동묘앞", "동암", "동인천", "동작", "두정", "둔촌동", "등촌", "디지털미디어시티", "뚝섬", "뚝섬유원지", "마곡", "마곡나루", "마두", "마들", "마장", "마천", "마포", "마포구청", "망원", "망월사", "매봉", "먹골", "면목", "명동", "명일", "명학", "모란", "목동", "몽촌토성", "무악재", "문래", "문정", "미아", "미아사거리", "반월", "반포", "발산", "방배", "방이", "방학", "방화", "배방", "백석", "백운", "버티고개", "범계", "병점", "보라매", "보문", "보산", "복정", "봉명", "봉은사", "봉천", "봉화산", "부개", "부천", "부천시청", "부천종합운동장", "부평", "부평구청", "불광", "사가정", "사당", "사평", "산본", "산성", "삼각지", "삼산체육관", "삼성", "삼성중앙", "삼송", "상계", "상도", "상동", "상록수", "상봉", "상수", "상왕십리", "상월곡", "상일동", "새절", "샛강", "서대문", "서동탄", "서울대입구", "서울역", "서정리", "서초", "석계", "석수", "석촌", "선릉", "선바위", "선유도", "선정릉", "성균관대", "성수", "성신여대입구", "성환", "세류", "세마", "소사", "소요산", "송내", "송정", "송탄", "송파", "수락산", "수리산", "수서", "수원", "수유", "수진", "숙대입구", "숭실대입구", "시청", "신금호", "신길", "신길온천", "신논현", "신답", "신당", "신대방", "신대방삼거리", "신도림", "신림", "신목동", "신반포", "신방화", "신사", "신설동", "신용산", "신이문", "신정", "신정네거리", "신중동", "신창", "신천", "신촌", "신풍", "신흥", "쌍문", "쌍용", "아산", "아차산", "아현", "안국", "안산", "안암", "안양", "암사", "압구정", "애오개", "약수", "양재", "양주", "양천구청", "양천향교", "양평", "어린이대공원", "언주", "여의나루", "여의도", "역곡", "역삼", "역촌", "연신내", "염창", "영등포", "영등포구청", "영등포시장", "오금", "오류동", "오목교", "오산", "오산대", "오이도", "옥수", "온수", "온양온천", "올림픽공원", "왕십리", "외대앞", "용답", "용두", "용마산", "용산", "우장산", "원당", "원흥", "월계", "월곡", "월드컵경기장", "을지로3가", "을지로4가", "을지로입구", "응암", "의왕", "의정부", "이대", "이수", "이촌", "이태원", "인덕원", "인천", "일원", "잠실", "잠실나루", "잠원", "장승배기", "장암", "장지", "장한평", "정발산", "정부과천청사", "정왕", "제기동", "제물포", "종각", "종로3가", "종로5가", "종합운동장", "주안", "주엽", "중계", "중곡", "중동", "중앙", "중화", "증미", "증산", "지제", "지축", "지행", "직산", "진위", "창동", "창신", "천안", "천왕", "천호", "철산", "청구", "청담", "청량리", "초지", "춘의", "충무로", "충정로", "태릉입구", "평촌", "평택", "하계", "학동", "학여울", "한강진", "한대앞", "한성대입구", "한양대", "합정", "행당", "혜화", "홍대입구", "홍제", "화곡", "화랑대", "화서", "화정", "회기", "회룡", "회현", "효창공원앞", "흑석"];
var currentIdx;



document.addEventListener('DOMContentLoaded', () => {
    /* set UI size dynamically */
    let height = window.innerHeight - 75;
    let width = window.innerWidth - 300 - 36;
    document.querySelector("#navigator").style.height = `${height}px`;
    document.querySelector("#map-container").style.height = `${height}px`;
    document.querySelector("#map-container").style.width = `${width}px`;
    document.querySelector("#metro").style.height = `${height - 40}px`;
    window.addEventListener('resize', () => {
        let height = window.innerHeight - 75;
        let width = window.innerWidth - 300 - 36;
        document.querySelector("#navigator").style.height = `${height}px`;
        document.querySelector("#map-container").style.height = `${height}px`;
        document.querySelector("#map-container").style.width = `${width}px`;
        document.querySelector("#metro").style.height = `${height - 40}px`;
    });

    /* Initialize metro data */
    axios.get('/data/stations')
    .then(res => {
        let stationData = res.data;

        for(let i = 0; i < Object.keys(stationData).length; i++) {
            var tempNode = new Node(stationData[i].Name, String(stationData[i].ID), String(stationData[i].line_num)+"호선", stationData[i].coord, stationData[i].coord2);
            stationNodes.push(tempNode);
        }

        
        axios.get('/data/neighbors')
        .then(res => {
            let neighborData = res.data;
            let fromIdx = 0;
            let toIdx = 0;

            for(let i = 0; i < stationNodes.length; i++) {
                for(let j = fromIdx; j < Object.keys(neighborData).length; j++) {
                    if(neighborData[j].ID_from == stationNodes[i].id) {
                        for(let k = toIdx; k < stationNodes.length; k++) {
                            if(stationNodes[k].id == neighborData[j].ID_to) {
                                let neighborObj = {};
                                neighborObj.node = stationNodes[k];
                                neighborObj.cost = Number(neighborData[j].Cost);
                                neighborObj.congestion = Number(neighborData[j].Congestion);
                                stationNodes[i].addNeighbor(neighborObj);
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

            render(stationNodes);
        });
    });


    document.querySelector("#search-path").addEventListener("click", searchPath);
    document.querySelector("#search-reset").addEventListener("click", resetPath);
    document.querySelector("#mode-select-normal > button").addEventListener("click", selectNormal);
    document.querySelector("#mode-select-congestion > button").addEventListener("click", selectCongestion);
    let inputSrc = document.querySelector("#input-path-src > input");
    let inputDst = document.querySelector("#input-path-dst > input");
    stAutoComplete(inputSrc, stations);
    stAutoComplete(inputDst, stations);
    inputSrc.addEventListener("keydown", autoCompleteKey);
    inputDst.addEventListener("keydown", autoCompleteKey);
    document.addEventListener("click", closeLists);

});

const searchPath = () => {
    disablePath();
    let src = document.querySelector("#input-path-src > input").value;
    let dst = document.querySelector("#input-path-dst > input").value;

    if(src && dst) {
        let srcNode, dstNode;

        for(let i in stationNodes) {
            if(!srcNode && src == stationNodes[i].name) {
                srcNode = stationNodes[i];
            }
            if(!dstNode && dst == stationNodes[i].name) {
                dstNode = stationNodes[i];
            }
        }
    
        renderPath(srcNode, dstNode);
    }

};

const resetPath = () => {
    disablePath();
    let srcIn = document.querySelector("#input-path-src > input");
    let dstIn = document.querySelector("#input-path-dst > input");

    srcIn.value = "";
    dstIn.value = "";
};

const stAutoComplete = (inp, stationArr) => {
    inp.addEventListener("input", function(e) {
        let a, tmpDiv;
        let val = this.value;
        console.log(val);

        closeLists();

        if(!val) {
            return false;
        }

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for(let i in stationArr) {
            if(stationArr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                let tmp = document.createElement("DIV");
                tmp.innerHTML = `<strong>${stationArr[i].substr(0, val.length)}</strong>${stationArr[i].substr(val.length)}\n`;
                tmp.innerHTML += `<input type='hidden' value='${stationArr[i]}'>`;
                tmp.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeLists();
                });
                a.appendChild(tmp);
            }
        }

    });
};

const closeLists = () => {
    let x = document.querySelector("#autocomplete-list");
    if(x) x.remove();
    currentIdx = null;
};

const autoCompleteKey = (e) => {
    let x = document.getElementById("autocomplete-list");
    if(x) x = x.getElementsByTagName("DIV");
    console.log(e.keyCode);

    if(e.keyCode == 40) {
        if(currentIdx === null) currentIdx = 0; 
        else currentIdx++;
        addActive(x);
    }
    else if(e.keyCode == 38) {
        if(currentIdx === null) currentIdx = x.length - 1; 
        else currentIdx--;
        addActive(x);
    }
    else if(e.keyCode == 13) {
        e.preventDefault();
        if(currentIdx !== null && currentIdx > -1) {
            if(x) x[currentIdx].click();
        }
    }
};

const addActive = x => {
    if(!x) return false;
    removeActive(x);

    if(currentIdx >= x.length) currentIdx = 0;
    if(currentIdx < 0) currentIdx = x.length - 1;

    x[currentIdx].classList.add("autocomplete-active");
};

const removeActive = x => {
    for(let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
    }

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
    disablePath();

    if(focusedLine != lineNum) {
        let lineArr = stationNodes.filter(n => {return n.metroLine == lineNum;});
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

