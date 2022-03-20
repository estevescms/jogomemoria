class JogoDaMemoria {

    //se mandar um obj = {tela: 1, idade: 2, etc: 3}
    //vai ignorar o resto das propriedades e pegar somente a propriedade dela
    constructor({ tela , util }){
        this.tela = tela
        this.util = util

        this.heroisIniciais = [

            //caminho do arquivo sempre relativo ao index.html
            { img: './arquivos/batman.png', nome: 'batman'},
            { img: './arquivos/coringa.png', nome: 'coringa'},
            { img: './arquivos/flash.png', nome: 'flash'},
            { img: './arquivos/groot.png', nome: 'groot'},
        ]
        this.iconePadrao = './arquivos/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    //para usar o this não podemos usar o static

    inicializar(){
        //vai pegar todas as funções da classe tela
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }
    async embaralhar(){
        const copias = this.heroisIniciais
        //Duplicar os herois iniciais
        .concat(this.heroisIniciais)
        
        //entrar em cada um
        .map(item =>{
            return Object.assign({}, item, {id: Math.random() / 0.5 })
            
        })
        //ordenar aleatoriamente
        .sort(() => Math.random() - 0.5 ) 
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo =this.tela.iniciarContador()

        //vamos esperar 3 segundo para atualizar a tela
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        

    }
    esconderHerois(herois) {
        //vamos trocar a imagem de todos os herois existentes
        //pelo icone padão
        //como fizemos no construtor vamos extrair somente o necessário
        const heroisOcultos = herois.map(( {nome, id}) =>({
            id,
            nome,
            img: this.iconePadrao
        }))

        //Atualizamos a tela com herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        //guardamos os herois para trabalhar com eles depois
        this.heroisEscondidos = heroisOcultos
    }
    exibirHerois(nomeDoHeroi) {
        //vamos procurar esse heroi pelo nomeem nossos heroisIniciais
        //vamos obter somente a imagem dele
        const {img} = this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)
        //vamos criar uma função na tela parar exibir somenteo Heroi Selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }
    verificarSelecao(id, nome) {
        const item = {id, nome}
        //vamos verificar a quantidade de herois selecionados
        //e tomar a ação se escolheu certo ou errrado
        const heroisSelecionados = this.heroisSelecionados.length
        switch (heroisSelecionados) {
            case 0:
                //adiciona a escolha na lista esperando a proxima 
                //clicada
                this.heroisSelecionados.push(item)
                break;
            case 1: 
            //se a quantidade escolhida for 1, significa que o usuario
            //só pode escolher mais um 
            //vamos obter o primeiro item da lista
            const [ opcao1 ] = this.heroisSelecionados
            //zerar itens para  não selecionar mais de dois
            this.heroisSelecionados = []
            //conferir se o nome e ids são iguais
            if(opcao1.nome === item.nome &&
              //aqui verificamos se os ids são diferentes para
              //o usuário não clicar duas vezes no mesmo
              opcao1.id !== item.id  
            ) {
                this.exibirHerois(item.nome)
                //como o padrão é tru, não precisa passar nada
                this.tela.exibirMensagem()

                //para a execução
                return;
            }

            this.tela.exibirMensagem(false)
        
            //fim do case
            break;
        }
    }
        mostrarHeroisEscondidos() {
             //vamos pegar todos os herois da tela e colocar seu
             //respectivo valor correto
             const heroisEscondidos = this.heroisEscondidos
             for(const heroi of heroisEscondidos) {
                 const { img } =this.heroisIniciais.find(item => item.nome === heroi.nome)
                 heroi.img = img
             }
             this.tela.atualizarImagens(heroisEscondidos)
        }


        jogar() {
            this.embaralhar()
    }
    
}