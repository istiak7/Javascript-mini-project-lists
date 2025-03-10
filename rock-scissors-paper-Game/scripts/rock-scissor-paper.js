let score = JSON.parse(localStorage.getItem('score'))
    ||  {
        win : 0 ,
        loss : 0,
        draw : 0
    };

function computerGuess(humanChoose){

    randomNumber = Math.random() * 15;
    let computerChoose = '';

    if(randomNumber < 5){
        computerChoose = 'Rock';        
    }
    else if(randomNumber < 10){
        computerChoose = 'Scissor';
    }
    else computerChoose = 'Paper';

    let result = '';
    if(humanChoose === computerChoose){
        result = 'You are Draw';
        score.draw++;
    }
    else if(humanChoose === 'Rock' && computerChoose === 'Scissor'){
        result = 'You are win';
        score.win++;
    }
    else if(humanChoose == 'Scissor' && computerChoose === 'Paper'){
        result = 'You are win';
        score.win++;
    }
    else if(humanChoose === 'Paper' && computerChoose === 'Rock'){
        result = 'You are win';
        score.win++;
    }
    else {
        result = 'You are loss';
        score.loss++;
    }

    localStorage.setItem('score', JSON.stringify (score));
    document.querySelector('.verdict').innerText = result;
    document.querySelector('.explain-verdict').innerHTML = `Your choose ${humanChoose} -  Computer choose ${computerChoose}`;

}

function totalScore() {
        document.querySelector('.total-score').innerHTML = `<h3>win : ${score.win} losses : ${score.loss} draw : ${score.draw}</h3>`;
    }

function resetFunction() {
    score.win = 0;
    score.loss = 0;
    score.draw = 0;
}