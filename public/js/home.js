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
const overlay = document.querySelector('#overlay');
const modalButton = document.querySelector('#saveScoreModal');
const name = document.querySelector('#name');
const messageBox = document.querySelector('#messageBox');
const message = document.querySelector('#message');
const ui = new UI(mainArea,beginTest,mainHead,mainContent,buttonGroup,tries,average,fastest,slowest,overlay,messageBox,message,modalButton);

loadEventHandlers();

function loadEventHandlers(){
    beginTest.addEventListener('click',beginTestFun);
    mainArea.addEventListener('click',mainAreaFun);
    modalButton.addEventListener('click',modalButtonFun);
    overlay.addEventListener('click',overlayFun);
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
    else if(e.target.id === 'saveScore'){
        ui.enableModal();
    }
    else{
        if(e.target!=beginTest && ui.state === 'Wait'){
            ui.setSoonState('Soon');
        }
    }
}

function modalButtonFun(e){
    e.preventDefault();
    if(e.target.id === 'saveScoreModal'){
        if(name.value === ''){
            name.placeholder = 'Name cannot be empty';
        }
        else{
            ui.saveToDb(name.value);
        }
    }
    else{
        window.location.reload();
    }

}

function overlayFun(e){
    e.preventDefault();
    if(e.target.id === 'retry'){
        window.location.reload();
    }
}