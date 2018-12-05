'use strict';
//let viewBoxX = 0;
//let viewBoxY = 0;
//let viewBoxWidth = 1255;
//let viewBoxHeight = 595.3;

let app = (function () {

    let svg = document.getElementById('Layer_1');
    let svg$ = $('#Layer_1');

    let textElement = document.getElementsByTagName('text');
    let textLength = textElement.length;

    function _setViewBox(viewBoxWidth, viewBoxHeight) {
        //svg.setAttribute("viewBox", viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight);
        svg.style.width = "100%";
    }

    function _addIDsForAllTextElements() {

        for (let i = 0; i < textLength; i++) {
            let id = textElement[i].textContent;
            textElement[i].id = id;
            textElement[i].addEventListener('click', () => {

                let element = document.getElementById(id);

                element.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });

            });
        }
    }

    function _addBtnEventListeners() {

        let zoominBtn = document.getElementById('zoomin');
        let zoomoutBtn = document.getElementById('zoomout');
        let zoomclearBtn = document.getElementById('zoomclear');

        zoominBtn.addEventListener('click', () => {
            //let currentWidth = svg.getAttribute('viewBox').split(" ")[2];
            //let currentHight = svg.getAttribute('viewBox').split(" ")[3];
            //_setViewBox(+currentWidth + 100, +currentHight + 50);
            _zoomIn();
        });
        zoomoutBtn.addEventListener('click', () => {
            //let currentWidth = svg.getAttribute('viewBox').split(" ")[2];
            //let currentHight = svg.getAttribute('viewBox').split(" ")[3];
            //_setViewBox(+currentWidth - 100, +currentHight - 50);
            _zoomOut();
        });
        zoomclearBtn.addEventListener('click', () => {
            let currentWidth = svg.style.width;
            svg.style.width = '100%';
        });

        svg$.bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                _zoomOut();
            } else {
                _zoomIn();
            }
        });

    }

    function _makeDraggable() {
        $("#Layer_1").draggable();
    }

    function _populateListOfStands() {
        let stands = document.getElementById('list-of-stands');
        let lines = '';

        for (let i = 0; i < textLength; i++) {
            lines += '<li class="list-group-item">' + textElement[i].textContent + '</li>';
        }

        stands.innerHTML = lines;
    }

    function _zoomIn() {
        let currentWidth = svg.style.width;
        svg.style.width = +currentWidth.slice(0, -1) - 20 + '%';
    }

    function _zoomOut() {
        let currentWidth = svg.style.width;
        svg.style.width = +currentWidth.slice(0, -1) + 20 + '%';
    }

    return {
        makeDraggable: _makeDraggable,
        setViewBox: _setViewBox,
        addIDsForAllTextElements: _addIDsForAllTextElements,
        addBtnEventListeners: _addBtnEventListeners,
        populateListOfStands: _populateListOfStands
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    app.setViewBox(1255, 595.3);
    app.addIDsForAllTextElements();
    app.addBtnEventListeners();
    app.makeDraggable();
    app.populateListOfStands();

});

//to be used http://interactjs.io/ ...tomorrow
