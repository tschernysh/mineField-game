let fieldEl = document.getElementsByClassName('app_field')




const gameInit = () => {
    let initMines = []
    let fieldSize = 10
    let minesCount = Math.ceil(Math.random()* (fieldSize*fieldSize))
    let cellCount = 0
    for(let i = 0; i < fieldSize*fieldSize ; i++){
        if(i <= minesCount-1){
            initMines[i] = 1
        }else{
            initMines[i] = 0
        }
    }
    const addCellCount = () => {
        cellCount++
    }
    fieldEl[0].innerHTML = ''
    initMines.sort((a, b) => 0.5 - Math.random())
    initMines.map(el => fieldEl[0].appendChild(document.createElement('button')))

    let buttons = document.getElementsByTagName('button')

    for(let i = 0; i < buttons.length; i++){
        buttons[i].id = i
        buttons[i].addEventListener('click', e => {
            console.log(e);
            if(!buttons[i].classList[0]){
                check(initMines, e.target.id, buttons, addCellCount)
            }if((fieldSize*fieldSize) - minesCount === cellCount){
                gameWon()
            }
        })
        buttons[i].addEventListener('contextmenu', e => {
            e.preventDefault()
            console.log(e);
            if(!e.target.disabled && !e.target.classList[0]){
                open('flag', e.target.id, buttons)
            }else if (e.target.classList[0]){
                open('unflag', e.target.id, buttons)
            }
            
        })
    }
}

const check = (initMines ,id, buttons, addCellCount) => {
    let minesAround = 0
    let width = id%10
    let height = Math.floor(id / 10)
    if(initMines[id]){
        open('boom', id, buttons)
    }else{
        for(let i = height - 1; i <= 1+height; i++){
            for(let k = width-1; k < width + 2; k++){
                if( !(i >= 10 || i < 0) && !(k >= 10 || k < 0 ) && !buttons[(i*10)+k].disabled ){
                    initMines[(i*10)+k] && minesAround++ 
                }
            }
        }
        open('checked', id, buttons, minesAround || null, addCellCount)
        if(!minesAround){
            for(let i = height - 1; i <= 1+height; i++){
                for(let k = width-1; k < width + 2; k++){
                    if( !(i >= 10 || i < 0) && !(k >= 10 || k < 0 ) && !buttons[(i*10)+k].disabled ){
                        check(initMines, ((i*10)+k), buttons, addCellCount)
                    }
                }
            }
        }
    }
    
}

const gameOver = () => {
    alert('better luck next time')
    gameInit()
}
const gameWon = () => {
    alert('Good Game')
    gameInit()
}

const open = (state, id, buttons, minesAround, addCellCount) => {
    switch(state){
        case 'boom':
            buttons[id].innerText = 'X'
            buttons[id].disabled = true
            buttons[id].classList = 'cell_boom'
            gameOver()
            return 
        case 'checked':
            addCellCount()
            buttons[id].innerText = minesAround
            buttons[id].disabled = true
            return
        case 'flag':
            buttons[id].innerText = 'F'
            buttons[id].classList = 'cell_flag'
            return
        case 'unflag':
            buttons[id].innerText = ''
            buttons[id].classList = ''
            return
        default:
            return
    }
}

gameInit()

