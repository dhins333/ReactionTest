import UI from './ui.js';

const mainArea = document.querySelector('#mainArea');
const beginTest = document.querySelector('#beginButton');
const mainHead = document.querySelector('#mainHead');
const mainContent = document.querySelector('#mainContent');
const buttonGroup = document.querySelector('#buttonGroup');
const tries = document.querySelector('#try');
const average = document.querySelector('#average');
const fastest = document.querySelector('#fastest');
const slowest = document.querySelector('#slowest');
const ui = new UI(mainArea,beginTest,mainHead,mainContent,buttonGroup,tries,average,fastest,slowest);

loadEventHandlers();

function loadEventHandlers(){
    beginTest.addEventListener('click',beginTestFun);
    mainArea.addEventListener('click',mainAreaFun);
}

function beginTestFun(e){
    e.preventDefault();
    ui.setWaitState('Wait');
}

function mainAreaFun(e){
    e.preventDefault();
    if(e.target.id ==='tryAgain'){
        e.preventDefault();
        ui.removeTryAgain(e.target);
        ui.setWaitState('Wait');
    }
    else if(ui.state === 'Click'){
        const end = new Date();
        ui.setClickedState('Clicked',end);
    }
    else{
        if(e.target!=beginTest && ui.state === 'Wait'){
            ui.setSoonState('Soon');
        }
    }
}