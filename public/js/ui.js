class UI{
    constructor(mainArea,beginTest,mainHead,mainContent,buttonGroup,tries,average,fastest,slowest){
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
    }

     setWaitState(state){
        this.state = state;
        this.mainArea.style.backgroundColor = '#d32626';
        this.mainHead.textContent = 'Wait for it...';
        this.mainContent.style.display = 'none';
        this.beginTest.remove();
        setTimeout(() => {this.setClickState('Click')},Math.round(Math.random() * (5000 - 1000) + 1000))
    }

    setSoonState(state){
        this.state = state;
        this.mainHead.textContent = 'Clicked Too Soon...';
        this.mainContent.style.display = 'none';
        this.mainContent.textContent = 'Try Again';
        this.addTryAgain();
    }

    setClickState(state){
        if(this.state === 'Wait'){
                this.state = state;
                this.mainArea.style.backgroundColor = '#79d70f';
                this.startTime = new Date();
                this.mainHead.textContent = 'Click Now';
                this.mainContent.style.display = 'none';
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
}

export default UI;