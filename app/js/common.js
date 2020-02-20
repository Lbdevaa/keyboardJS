let resultPrint = document.querySelector('.space__result');
 
let box = document.querySelector('.box');
let keyboardAlpabet = document.querySelector('.keyboard__alphabet');
let keyboardKey = document.querySelectorAll('.keyboad__key');

box.addEventListener('click', e => {
    
    e.preventDefault();
    let target = e.target.closest('a');

    if (target !== null) {
        handleMoreKey(e.target.closest('a'));
    }

    if (e.target.classList.contains('keyboard__key')) {
        resultPrint.value += e.target.innerHTML; 
        // console.log(e.target.innerHTML);
    }
})

function handleMoreKey(target) {
    
    if (target.dataset.key === 'del') {      
        resultPrint.value = resultPrint.value.slice(0,-1);
    } 
    
    if (target.dataset.key === 'space') {      
        resultPrint.value += ' ';
    } 
    if (target.dataset.key === 'char') {
        resultPrint.value += target.innerHTML;
    }
    if (target.classList.contains('more-key_lang')) {
        let keyboards = document.querySelectorAll('.keyboard__alphabet');

        let n = keyboards.length;
        if (target.innerHTML = 'RUS') {
            target.innerHTML = 'ENG';
        } else {
            target.innerHTML = 'RUS'
        }

        for (let i = 0; i < n; i++) {
            if (keyboards[i].classList.contains('active')) {
                keyboards[i].classList.remove('active');
                keyboards[(i+1)%n].classList.add('active');
                break;
            }
        }

    }
}

let tapEnter = e => {
    if (e.keyCode === 13){

        e.preventDefault();
        handleMoreKey(e.target);

    }
    
} 
 
window.addEventListener('keydown', tapEnter);
 
//
// let sp = document.querySelector('.sp');
// // for(abc = '&11072'; abc++)
// let arabc = '&#1072'
// sp.innerHTML = arabc