//this will store the complete score and not change after refreshing and make it zero when reset is used
const score = JSON.parse(localStorage.getItem('score')) || {
        win:0,
        losses:0,
        Tie:0
};

        
updateScoreElement();

let isAutoPlaying = false;
let intervalID;

//this function will help in 'Auto Playing' of game
function autoPlay()
{
    if(!isAutoPlaying)
    {
        intervalID = setInterval(()=>{
            const playerMove = pickcomputerMove();
            games(playerMove);
        },1000);
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

//here the use of addEventListner on button onclick event
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    games('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    games('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',()=>{
    games('Scissors');
});

document.body.addEventListener('keydown',(event)=>
{
    if(event.key === 'r')
    {
        games('Rock');
    }
    else if(event.key === 'p')
    {
        games('Paper');
    }
    else if(event.key === 's')
    {
        games('Scissors');
    }
})

//using function and its parameter 
        function games(playerMove)
        {
            //this is the function call for random generation of pick
            pickcomputerMove();
            let result='';
            if(playerMove==='Scissors')
            {
                if(computerMove==='Rock')
                {
                    result= 'You loose.';
                }
                else if(computerMove==='Paper')
                {
                    result='You Won!';
                }
                else if(computerMove==='Scissors')
                {
                    result='Tie.';
                }
            }
            else if(playerMove==='Paper')
            {
                if(computerMove==='Rock')
                {
                    result= 'You Won!';
                }
                else if(computerMove==='Paper')
                {
                    result='Tie.';
                }
                else if(computerMove==='Scissors')
                {
                    result='You loose.';
                }
            }
            else if(playerMove==='Rock')
            {
                if(computerMove==='Rock')
                {
                    result= 'Tie.';
                }
                else if(computerMove==='Paper')
                {
                    result='You loose.';
                }
                else if(computerMove==='Scissors')
                {
                    result='You Won!';
                }
            }
            if(result==='You Won!')
            {
                score.win +=1;
            }
            else if(result==='You loose.')
            {
                score.losses +=1;
            }
            else if(result==='Tie.')
            {
                score.Tie +=1;
            }
            localStorage.setItem('score',JSON.stringify(score));

           updateScoreElement();

           //this will provide the result without the popup 
           document.querySelector('.js-result').innerHTML= result;
           document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="" class="emoji">
        <img src="images/${computerMove}-emoji.png" alt="" class="emoji">
        Computer`;
            
            //this is help in to create the popup to show the result

            //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} 
// Win: ${score.win}, Looses: ${score.losses}, Tie: ${score.Tie}`)
        }

        //this function help in to update the win,loose and tie values
        function updateScoreElement()
        {
            document.querySelector('.js-score').innerHTML = `Win: ${score.win}, Looses: ${score.losses}, Tie: ${score.Tie}`;
        }

        //this is for random generation of picks
        let computerMove = '';
        function pickcomputerMove()
        {
            const random = Math.random();
            if(random >=0 && random <1/3)
            {
                computerMove='Rock';
            }
            else if(random>=1/3 && random<2/3)
            {
                computerMove='Paper';
            }
            else if(random>=2/3 && random<1)
            {
                computerMove='Scissors';
            }
            return computerMove;
        }