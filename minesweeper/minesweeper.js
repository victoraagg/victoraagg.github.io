class MineSweeper {

    tablero = []
    minas = []
    tamanoTablero = 3
    numMinas = 3
    aciertos = []

    constructor() {
        this.rellenarTablero()
        this.rellenarMinas()
        this.comenzarJuego()
    }

    rellenarTablero() {
        for (let row = 0; row < this.tamanoTablero; row++){
            let cols = []
            for (let col = 0; col < this.tamanoTablero; col++){
                cols.push(0)
            }
            this.tablero.push(cols)
        }
    }

    rellenarMinas() {
        for (let index = 0; index < this.numMinas; index++) {
            let x = this.getNumAleatorio(0, this.numMinas - 1)
            let y = this.getNumAleatorio(0, this.numMinas - 1)
            this.minas.push([x,y])
        }
        this.minas = this.limpiarArrayDuplicado(this.minas)
    }

    comenzarJuego() {
        do{
            this.mostrarEstadoTablero()
            var coordenada = this.solicitarCoordenadas()
            if(this.esAcierto(coordenada)){
                alert('Coordenada correcta')
                this.pintarMina(coordenada)
            }else{
                alert('Coordenada vacía')
            }
        } while(!this.juegoFinalizado())
    }

    mostrarEstadoTablero() {
        var mensaje = 'Juego del buscaminas\n'
        mensaje += `Estado del tablero:\n`
        for (let row = 0; row < this.tamanoTablero; row++){
            let cols = ''
            for (let col = 0; col < this.tamanoTablero; col++){
                cols += this.tablero[row][col]
            }
            mensaje += cols+'\n'
        }
        alert(mensaje)
    }

    solicitarCoordenadas() {
        do {
            var x = prompt(`Escribe un número entre 0 y ${this.tamanoTablero - 1} para la posición X`)
            var y = prompt(`Escribe un número entre 0 y ${this.tamanoTablero - 1} para la posición Y`)
            var coordenada = [x, y]
        } while (!this.coordenadaValida(coordenada));
        return coordenada
    }

    coordenadaValida(coordenada) {
        let x = parseInt(coordenada[0])
        let y = parseInt(coordenada[1])
        if(x <= this.tamanoTablero - 1 && y <= this.tamanoTablero - 1) {
            return true
        }
        return false
    }

    esAcierto(coordenada) {
        let x = parseInt(coordenada[0])
        let y = parseInt(coordenada[1])
        let valid = false
        this.minas.forEach(element => {
            if(element[0] == x && element[1] == y){
                valid = true
                this.aciertos.push([x, y])
            }
        });
        return valid
    }

    pintarMina(coordenada) {
        let x = coordenada[0]
        let y = coordenada[1]
        this.tablero[x][y] = 1
    }

    juegoFinalizado() {
        if(this.numMinas == this.aciertos.length){
            alert('Enhorabuena\n¡Has ganado el juego!')
            return true
        }
        return false
    }

    limpiarArrayDuplicado(array) {
        let arrayClean = array.reduce(function(out, item) {
            return out.concat(out.filter(function(comp) {
                return item.toString() == comp.toString();
            }).length ? [] : [item])
        }, []);
        return arrayClean
    }

    getNumAleatorio(min, max) {
        let posibilidades = max - min + 1
        let numAleatorio = Math.random() * posibilidades
        numAleatorio = Math.floor(numAleatorio)
        return min + numAleatorio
    }

}

var mineSweeper = new MineSweeper()