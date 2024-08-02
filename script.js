class NoteApp {
    constructor() {
        this.start();
    }

    start() {
        let option = prompt(
            "Escriba LISTA si desea escribir una lista, NOTA si desea escribir una nota, VER_NOTAS para ver las últimas notas, VER_LISTAS para ver las últimas listas, BORRAR_NOTAS para borrar notas o BORRAR_LISTAS para borrar listas"
        );

        if (option === null) {
            return; 
        }

        option = option.trim().toLowerCase();

        switch (option) {
            case "nota":
                this.handleNota();
                break;
            case "lista":
                this.handleLista();
                break;
            case "ver_notas":
                this.showRecentNotas();
                break;
            case "ver_listas":
                this.showRecentListas();
                break;
            case "borrar_notas":
                this.deleteNotas();
                break;
            case "borrar_listas":
                this.deleteListas();
                break;
            default:
                alert('Introduzca un valor correcto (LISTA, NOTA, VER_NOTAS, VER_LISTAS, BORRAR_NOTAS o BORRAR_LISTAS)');
                this.start(); 
                break;
        }
    }

    handleNota() {
        let nota = prompt('Escriba aquí su nota');
        if (nota === null) {
            this.start();
        } else if (nota.trim() === "") {
            alert('Por favor intente escribir su nota nuevamente');
            this.handleNota(); 
        } else {
            this.saveNota(nota);
            alert(`Su nota es: ${nota}`);
        }
    }

    handleLista() {
        const lista = this.addToList(); 
        this.saveLista(lista);
        alert(`Su lista es: ${lista.join(' - ')}`);
    }

    addToList() {
        const lista = [];
        
        while (true) {
            let valor = prompt('Añadir elemento a la lista');
            if (valor === null) {
                this.start();
            } else if (valor.trim() === "") {
                alert('Por favor escriba el elemento que desea añadir a su lista');
            } else {
                lista.push(valor);
                if (!confirm('¿Desea añadir otro elemento a su lista?')) {
                    break; 
                }
            }
        }
        
        return lista;
    }

    saveNota(nota) {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    saveLista(lista) {
        const listas = JSON.parse(localStorage.getItem('listas')) || [];
        listas.push(lista);
        localStorage.setItem('listas', JSON.stringify(listas));
    }

    showRecentNotas() {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        if (notas.length === 0) {
            alert('No hay notas guardadas.');
        } else {
            alert(`Últimas notas:\n${notas.slice(-5).join('\n')}`);
        }
        this.start();
    }

    showRecentListas() {
        const listas = JSON.parse(localStorage.getItem('listas')) || [];
        if (listas.length === 0) {
            alert('No hay listas guardadas.');
        } else {
            alert(`Últimas listas:\n${listas.slice(-5).map(lista => lista.join(' - ')).join('\n')}`);
        }
        this.start();
    }

    deleteNotas() {
        if (confirm('¿Está seguro de que desea borrar todas las notas?')) {
            localStorage.removeItem('notas');
            alert('Todas las notas han sido borradas.');
        }
        this.start();
    }

    deleteListas() {
        if (confirm('¿Está seguro de que desea borrar todas las listas?')) {
            localStorage.removeItem('listas');
            alert('Todas las listas han sido borradas.');
        }
        this.start();
    }
}

// Inicializar la aplicación
new NoteApp();