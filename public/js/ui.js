class UI{
    constructor(mainArea,beginTest,mainHead,mainContent,buttonGroup,tries,average,fastest,slowest,overlay,messageBox,message,modalButton){
        this.state = 'Begin';
        this.average = 0;
        this.tries = 0;
        this.fastest = 0;
        this.slowest = 0;
        this.total = 0;
        this.startTime;
        this.endTime;
        this.mainArea = mainArea;
        this.beginTest = beginTest;
        this.mainHead = mainHead;
        this.mainContent = mainContent;
        this.buttonGroup = buttonGroup;
        this.triesField = tries;
        this.averageField = average;
        this.fastestField = fastest;
        this.slowestField = slowest;
        this.overlay = overlay;
        this.messageBox = messageBox;
        this.message = message;
        this.modalButton = modalButton;
    }

     setWaitState(state){
        this.state = state;
        this.mainArea.style.backgroundColor = '#d32626';
        this.mainHead.textContent = 'Wait for it...';
        this.mainContent.style.display = 'none';
        this.beginTest.remove();
        setTimeout(() => {this.setClickState('Click')},Math.round(Math.random() * (5000 - 2000) + 2000))
    }

    setSoonState(state){
        this.state = state;
        this.mainHead.textContent = 'Clicked Too Soon...';
        this.mainContent.style.display = 'block';
        this.mainContent.textContent = 'Wait for counter reset...';
        
    }

    setClickState(state){
        if(this.state === 'Wait'){
                this.state = state;
                this.mainArea.style.backgroundColor = '#79d70f';
                this.startTime = new Date();
                this.mainHead.textContent = 'Click Now';
                this.mainContent.style.display = 'none';
        }
        else{
            this.mainContent.style.display = 'none';
            this.addTryAgain();
        }
    }

    setClickedState(state,end){
        this.endTime = end;
        const timedif = Math.abs(this.endTime-this.startTime) - 40;
        this.state = state;
        this.tries = this.tries+1;
        this.total = this.total + timedif;
        this.average = Math.round(this.total/this.tries);
        
        if(timedif>this.slowest){
            this.slowest = timedif;
        }

        if(this.fastest == 0){
            this.fastest = timedif
        }
        else{
            if(timedif<this.fastest){
                this.fastest = timedif;
            }
        }

        if(this.tries===5){
            this.mainHead.textContent = `Average:${this.average}`;
            this.mainContent.style.display = 'block';
            this.mainContent.textContent = `This Try:${timedif}`;
            const saveScore = document.createElement('a');
            saveScore.id = 'saveScore';
            saveScore.textContent = 'Save Score';
            saveScore.style.cursor = 'pointer';
            this.buttonGroup.append(saveScore);
            this.setStats();
        }
        else{
            this.mainHead.textContent = `${timedif}ms`;
            this.addTryAgain();
            this.setStats();
        }

    }

    removeTryAgain(tryAgainButton){
        tryAgainButton.remove();
    }

    addTryAgain(){
        const tryAgainButton = document.createElement('a');
        tryAgainButton.id = 'tryAgain';
        tryAgainButton.textContent = 'Try Again';
        tryAgainButton.style.cursor = 'pointer';
        this.buttonGroup.append(tryAgainButton);
    }

    setStats(){
        this.triesField.textContent = `Tries:${this.tries}/5`;
        this.averageField.textContent = `Average:${this.average}`;
        this.fastestField.textContent  = `Fastest:${this.fastest}`;
        this.slowestField.textContent = `Slowest:${this.slowest}`;            
    }

    enableModal(){
        this.overlay.style.display = 'flex';
    }

    async saveToDb(name){
        try{
            const result = await axios.post('/saveScore',{
                name,
                average:this.average,
                fastest:this.fastest,
                slowest:this.slowest
            });
            this.showMessage('Saved Score Successfully','#79d70f');
            this.modalButton.id = 'retry';
            this.modalButton.value = 'Retry';
        }catch(e){
            this.showMessage('Some Error Occured,try saving again','#d32626');
        }
    }

    showMessage(text,color){
        this.message.textContent = text;
        this.messageBox.style.backgroundColor = color;
        this.messageBox.style.display = 'block';
        setTimeout(() => {this.hideMessage()},2000);
    }

    hideMessage(){
        this.messageBox.style.display = 'none';
    }
}

export default UI;