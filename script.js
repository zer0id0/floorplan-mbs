'use strict';
//let viewBoxX = 0;
//let viewBoxY = 0;
//let viewBoxWidth = 1255;
//let viewBoxHeight = 595.3;

let app = (function () {

    let svg = document.getElementById('Layer_1');

    function _setViewBox(viewBoxWidth, viewBoxHeight) {
        //svg.setAttribute("viewBox", viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight);
        svg.style.width = "100%";
    }

    function _addIDsForAllTextElements() {
        let textElement = document.getElementsByTagName('text');
        let textLength = textElement.length;

        for (let i = 0; i < textLength; i++) {
            let id = textElement[i].textContent;
            textElement[i].id = id;
            textElement[i].addEventListener('click', () => {
                let element = document.getElementById(id);
                console.log(element.parentElement);
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
        svg.style.width

        zoominBtn.addEventListener('click', () => {
            //let currentWidth = svg.getAttribute('viewBox').split(" ")[2];
            //let currentHight = svg.getAttribute('viewBox').split(" ")[3];
            //_setViewBox(+currentWidth + 100, +currentHight + 50);
            let currentWidth = svg.style.width;
            svg.style.width = +currentWidth.slice(0, -1) - 20 + '%';
        });
        zoomoutBtn.addEventListener('click', () => {
            //let currentWidth = svg.getAttribute('viewBox').split(" ")[2];
            //let currentHight = svg.getAttribute('viewBox').split(" ")[3];
            //_setViewBox(+currentWidth - 100, +currentHight - 50);
            let currentWidth = svg.style.width;
            svg.style.width = +currentWidth.slice(0, -1) + 20 + '%';
        });

    }

    function _makeDraggable() {
        $("#Layer_1").draggable();
    }

    return {
        makeDraggable: _makeDraggable,
        setViewBox: _setViewBox,
        addIDsForAllTextElements: _addIDsForAllTextElements,
        addBtnEventListeners: _addBtnEventListeners
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    app.setViewBox(1255, 595.3);
    app.addIDsForAllTextElements();
    app.addBtnEventListeners();
    app.makeDraggable();

});

//to be used http://interactjs.io/ ...tomorrow
