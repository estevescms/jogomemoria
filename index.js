function onLoad() {
    
    const dependencias = {
        tela: Tela, // a classe Tela é global
        util : Util 
    }
    //iniciamos ojogo da memória
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()

}
window.onload = onLoad  