let resultPrint = document.querySelector('.space__result'); 
let box = document.querySelector('.box');  

box.addEventListener('click', e => {
    
    e.preventDefault();
    let target = e.target.closest('a');

    if (target !== null) {
        handleMoreKey(e.target.closest('a'));
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

        if (target.innerHTML === 'RUS') {
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

let tapKey = e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        handleMoreKey(e.target);
    }
    
} 

window.addEventListener('keydown', tapKey);
 

// build Keyboards on class build
//дети
let space = document.createElement('div');
space.className = 'space' ; 

let spaceResult = document.createElement('input')
spaceResult.className = 'space__result' ; 
spaceResult.size = '11';
spaceResult.placeholder = 'start typing'
spaceResult.type="text" 

let keyDel = document.createElement('a');
keyDel.href= '';
keyDel.classList = 'more-key more-key_del';
keyDel.setAttribute ('data-key', 'del');

let keySpace = document.createElement('a');
keySpace.href= '';
keySpace.classList = 'more-key more-key_space';
keySpace.setAttribute ('data-key', 'space');

let keyLang = document.createElement('a');
keyLang.href= '';
keyLang.classList = 'more-key more-key_lang'; 
keyLang.innerHTML = 'RUS' 

let keyboard = document.createElement('div');
keyboard.classList = 'keyboard grid';

// let alphabet = document.createElement('div');
// alphabet.classList = 'keyboard__alphabet keyboard__alphabet_en active';
// alphabet.text = 'a'

let numbers = document.createElement('div');
numbers.className = 'keyboard__numbers'; 

// let keyNumbers = document.createElement('a');
// keyNumbers.href ='';
// keyNumbers.setAttribute ('data-key', 'char');
// keyNumbers.className = 'keyboard__key';
// keyNumbers.text = '0';
 
// родитель
let buildKeyboard = document.querySelector('.build') 

//добавление 
 
space.innerHTML += spaceResult.outerHTML + keyDel.outerHTML  + keySpace.outerHTML + keyLang.outerHTML; 
keyboard.appendChild(createRU());
keyboard.appendChild(createNumbers()); 
buildKeyboard.innerHTML += space.outerHTML + keyboard.outerHTML;  

function createNumbers() {
    let keyNumbers = document.createElement('div');
    keyNumbers.className = 'keyboard__numbers';

    for (let i = 0; i< 10; i++){
        let keyboardKey = document.createElement('a')
        keyboardKey.href ='';
        keyboardKey.setAttribute ('data-key', 'char');
        keyboardKey.className = 'keyboard__key';
        keyboardKey.text = i;
        keyNumbers.appendChild(keyboardKey);
    }
    return keyNumbers;
} 

function createRU() {
    
    let alphabet = document.createElement('div');
    alphabet.classList = 'keyboard__alphabet keyboard__alphabet_ru active';
    alphabet.text = 'a'; 
    
    for (let i = 1072; i < 1072+32; i++) {
        let keyboardABC = document.createElement('a');
        keyboardABC.href ='';
        keyboardABC.className = 'keyboard__key';
        keyboardABC.innerHTML = String.fromCharCode(i); 
        alphabet.appendChild(keyboardABC); 
    }
    return alphabet; 
}
console.log(createRU());

// Чтобы создать язык - createLang с указанием начала алфавита и конечной буквы. 'ru', '1072' '1104'
let languages = []
function createLang(name, start, end) {
    languages[name] = [start, end];
}
createLang('ru', 1040, 1072)
console.log('arrayLang:', languages)