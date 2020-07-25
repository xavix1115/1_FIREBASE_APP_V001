










class Caos{

    constructor(){
        this.seed = Date.now();
    }
   
    random(){
        
        var noise = 
            + Math.sin(this.seed * 20)
            + Math.cos(this.seed * 30)
            + Math.sin(this.seed * 5)
            + (Math.cos(this.seed * 42)/5)
            + Math.sin(this.seed * 0.1)

        var y = 1 / (1 + Math.pow(Math.E, noise))

        this.seed += y 
        
        return y

    }

    
}





function setup(){
    var caos1 = new Caos();

    for(var i=0; i < 10; i++){
        console.log(caos1.random());
    }
}

function cesar(text){
    const letters = 'qwertyuiopasdfghjklzxcvbnmñ,. QWERTYUIOPASDFGHJKLZXCVBNMÑ'.split('')
    let result = ''
        const caos = new Caos()
        const key = []
        for (let i = 0; i < text.length; i++){
            const char = text.charAt(i);
            let letterIndex = letters.indexOf(char)
            let offset = Math.round(caos.random() * letters.length)
            letterIndex += offset
            letterIndex %= letters.length
            key.push(offset)
            result += letters[letterIndex]
        }

        return {
            text: result,
            key: key
        }
}

function uncesar(text, key){
    const letters = 'qwertyuiopasdfghjklzxcvbnmñ,. QWERTYUIOPASDFGHJKLZXCVBNMÑ'.split('')
    let result = ''
        const caos = new Caos()
        for (let i = 0; i < text.length; i++){
            const char = text.charAt(i);
           
            let letterIndex = letters.indexOf(char)
           
            letterIndex -= key[i]

            if (letterIndex < 0){
                letterIndex = letters.length + letterIndex;
            }

            result += letters[letterIndex]
        }

        return result
}


setup();

const e = cesar("hola")
console.log(e)
const m = uncesar(e.text, e.key)
console.log(m)




