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
    let rectElement = document.getElementsByTagName('rect');

    function _setViewBox(viewBoxWidth, viewBoxHeight) {
        //svg.setAttribute("viewBox", viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight);
        svg.style.width = "100%";
    }

    function _addIDsForAllTextElements() {

        for (let i = 0; i < textLength; i++) {
            let id = textElement[i].textContent;
            textElement[i].id = id;

            //add 'click' event listeners to text elements
            textElement[i].addEventListener('click', (e) => {

                let target = svg.getElementById('rect-' + id);

                _selectStand(target);
            });

            //add 'click' event listeners to rect elements
            if (rectElement['rect-' + i]) {
                rectElement['rect-' + i].addEventListener('click', (e) => {

                    let target = e.target;

                    _selectStand(target);
                });
            }
        }
    }

    function _addEventListeners() {

        let zoominBtn = document.getElementById('zoomin');
        let zoomoutBtn = document.getElementById('zoomout');
        let zoomclearBtn = document.getElementById('zoomclear');
        let searchBtn = document.getElementById('search-btn');

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
            svg.style.left = '0px';
            svg.style.top = '0px';
        });

        searchBtn.addEventListener('click', () => {
            let serchInput = document.getElementById('searchInput');
            let listOfStends = document.getElementById('list-of-stands');

            if (!serchInput.value) {
                listOfStends.childNodes.forEach(e => e.style.display = 'block');
            } else {
                listOfStends.childNodes.forEach(e => {
                    if (e.innerHTML.indexOf(serchInput.value) != -1) {
                        e.style.display = 'block';

                    } else {
                        e.style.display = 'none';
                    }
                });
            }
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
            let id = textElement[i].textContent;
            lines += '<li class="list-group-item" name="list-options" id="' + id + '">' + id + '</li>';
        }

        stands.innerHTML = lines;

        let listOptions = document.getElementsByName('list-options');
        listOptions.forEach(e => {
            e.addEventListener('click', () => {
                _selectStand(document.getElementById('rect-' + e.id))
            })
        });
    }

    function _zoomIn() {
        let currentWidth = svg.style.width;
        svg.style.width = +currentWidth.slice(0, -1) - 20 + '%';
    }

    function _zoomOut() {
        let currentWidth = svg.style.width;
        svg.style.width = +currentWidth.slice(0, -1) + 20 + '%';
    }

    function _selectStand(target) {

        if (!target) return;

        let activeElements = svg.getElementsByClassName('stand-active');
        if (activeElements.length > 0) {
            activeElements[0].classList.remove("stand-active");
        }

        target.classList.add('stand-active');

        target.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        });

        //focus on selected element
        let currentWidth = svg.style.width;
        svg$.animate({ width: '500%' }, 'slow');
        //svg.style.left = '0px';
        //svg.style.top = '0px';
    }

    return {
        makeDraggable: _makeDraggable,
        setViewBox: _setViewBox,
        addIDsForAllTextElements: _addIDsForAllTextElements,
        addEventListeners: _addEventListeners,
        populateListOfStands: _populateListOfStands,
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('sidebar')[0].style.display = 'none';
    app.setViewBox(1255, 595.3);
    app.addIDsForAllTextElements();
    app.addEventListeners();
    app.makeDraggable();
    app.populateListOfStands();
});

//to be used http://interactjs.io/ ...tomorrow
