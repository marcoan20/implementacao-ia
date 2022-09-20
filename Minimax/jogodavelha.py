import numpy as np
import os

gameLoop = True

while(gameLoop):

    tabuleiro = np.array([
        ['  ', '  ', '  '],
        ['  ', '  ', '  '],
        ['  ', '  ', '  ']
        ])
    x = True
    maquina = ""
    jogador = ""

    profundidadeTotal = 0

    MaquinaComeca = False

    def printarTabuleiroJogoDaVelha(tabuleiro):
        os.system('CLS')
        print("Você é: " + jogador + " e a máquina é: " + maquina + "\n")
        print('\t    |    |')
        print('\t', tabuleiro[0][0], '|', tabuleiro[0][1], '|', tabuleiro[0][2])
        print('\t    |    |')
        print('\t--------------')
        print('\t    |    |')
        print('\t ' + tabuleiro[1][0] + ' | ' +
            tabuleiro[1][1] + ' | ' + tabuleiro[1][2])
        print('\t    |    |')
        print('\t--------------')
        print('\t    |    |')
        print('\t ' + tabuleiro[2][0] + ' | ' +
            tabuleiro[2][1] + ' | ' + tabuleiro[2][2])
        print('\t    |    |\n')


    def rodadaUsuario():
        linha = input('Digite a linha: ')
        coluna = input('Digite a coluna: ')

        if(linha >= "1" and linha <= "3" and coluna >= "1" and coluna <= "3"):
            linha = int(linha) - 1
            coluna = int(coluna) - 1

            if(tabuleiro[linha][coluna] == '  '):
                tabuleiro[linha][coluna] = str(jogador)
            else:
                printarTabuleiroJogoDaVelha(tabuleiro)
                print('Jogada inválida!')
                rodadaUsuario()

        printarTabuleiroJogoDaVelha(tabuleiro)


    def rodadaMaquina():
        bestMove()
        #coluna = np.random.randint(3)
        #linha = np.random.randint(3)

        # if(tabuleiro[linha][coluna] == '  '):
        #    tabuleiro[linha][coluna] = str(maquina)
        # else:
        #    rodadaMaquina()


    def minimax(tabuleiro, profundidade, isMaximizing):

        global profundidadeTotal

        if(verificarVencedor() == jogador):
            # print("max")
            return 10 - profundidade
        elif(verificarVencedor() == maquina):
            # print("min")
            return -10 + profundidade
        elif(verificarVencedor() == "Empate"):
            # print("empate")
            return 0

        profundidadeTotal = profundidadeTotal + 1

        if(isMaximizing):
            bestScore = -50000
            for i in range(3):
                for j in range(3):
                    if(tabuleiro[i][j] == '  '):
                        tabuleiro[i][j] = jogador
                        valor = minimax(tabuleiro, profundidade + 1, False)
                        tabuleiro[i][j] = '  '
                        bestScore = max(valor, bestScore)
            return bestScore
        else:
            bestScore = 50000
            for i in range(3):
                for j in range(3):
                    if(tabuleiro[i][j] == '  '):
                        tabuleiro[i][j] = maquina
                        valor = minimax(tabuleiro, profundidade + 1, True)
                        tabuleiro[i][j] = '  '
                        bestScore = min(valor, bestScore)
            return bestScore


    def bestMove():
        bestScore = 50000
        bestMove = [-1, -1]
        for i in range(3):
            for j in range(3):
                if(tabuleiro[i][j] == '  '):
                    tabuleiro[i][j] = maquina
                    score = minimax(tabuleiro, 0, True)
                    tabuleiro[i][j] = '  '
                    if(score < bestScore):
                        bestScore = score
                        bestMove = [i, j]

        tabuleiro[bestMove[0]][bestMove[1]] = maquina


    def verificarEmpate():
        for i in range(3):
            for j in range(3):
                if(tabuleiro[i][j] == '  '):
                    return False
        return True


    def verificarTabuleiroJogador():
        if(tabuleiro[0][0] == tabuleiro[0][1] == tabuleiro[0][2] == jogador):
            return True
        elif(tabuleiro[1][0] == tabuleiro[1][1] == tabuleiro[1][2] == jogador):
            return True
        elif(tabuleiro[2][0] == tabuleiro[2][1] == tabuleiro[2][2] == jogador):
            return True
        elif(tabuleiro[0][0] == tabuleiro[1][0] == tabuleiro[2][0] == jogador):
            return True
        elif(tabuleiro[0][1] == tabuleiro[1][1] == tabuleiro[2][1] == jogador):
            return True
        elif(tabuleiro[0][2] == tabuleiro[1][2] == tabuleiro[2][2] == jogador):
            return True
        elif(tabuleiro[0][0] == tabuleiro[1][1] == tabuleiro[2][2] == jogador):
            return True
        elif(tabuleiro[0][2] == tabuleiro[1][1] == tabuleiro[2][0] == jogador):
            return True


    def verificarTabuleiroMaquina():
        if(tabuleiro[0][0] == tabuleiro[0][1] == tabuleiro[0][2] == maquina):
            return True
        elif(tabuleiro[1][0] == tabuleiro[1][1] == tabuleiro[1][2] == maquina):
            return True
        elif(tabuleiro[2][0] == tabuleiro[2][1] == tabuleiro[2][2] == maquina):
            return True
        elif(tabuleiro[0][0] == tabuleiro[1][0] == tabuleiro[2][0] == maquina):
            return True
        elif(tabuleiro[0][1] == tabuleiro[1][1] == tabuleiro[2][1] == maquina):
            return True
        elif(tabuleiro[0][2] == tabuleiro[1][2] == tabuleiro[2][2] == maquina):
            return True
        elif(tabuleiro[0][0] == tabuleiro[1][1] == tabuleiro[2][2] == maquina):
            return True
        elif(tabuleiro[0][2] == tabuleiro[1][1] == tabuleiro[2][0] == maquina):
            return True


    def verificarVencedor():
        if(verificarTabuleiroJogador()):
            return jogador
        elif(verificarTabuleiroMaquina()):
            return maquina
        elif(verificarEmpate()):
            return 'Empate'
        return "none"


    os.system('CLS')

    profundidade = 0;
    inputJogador = input('Escolha 🐶(1) ou 🐱(2): ')

    if(inputJogador == '1'):
        maquina = '🐱'
        jogador = '🐶'
    else:
        maquina = '🐶'
        jogador = '🐱'

    inputJogador = input('Deseja começar? (s/n): ')

    if(inputJogador == 's'):
        MaquinaComeca = False
    elif(inputJogador == 'n'):
        MaquinaComeca = True
    else:
        MaquinaComeca = False

    while x:
        printarTabuleiroJogoDaVelha(tabuleiro)
        if (MaquinaComeca):
            rodadaMaquina()
        else:
            print("Numero de jogadas simuladas: ", profundidadeTotal)
            rodadaUsuario()

        printarTabuleiroJogoDaVelha(tabuleiro)

        if(verificarVencedor() != "none"):
            if (verificarVencedor() == jogador):
                print("Você venceu!")
            elif(verificarVencedor() == maquina):
                print("Você perdeu!")
            else:
                print("Empate!")
            break

        if (MaquinaComeca):
            print("Numero de jogadas simuladas: ", profundidadeTotal)
            rodadaUsuario()
        else:
            rodadaMaquina()
        printarTabuleiroJogoDaVelha(tabuleiro)

        if(verificarVencedor() != "none"):
            if (verificarVencedor() == jogador):
                print("Você venceu!")
            elif(verificarVencedor() == maquina):
                print("Você perdeu!")
            else:
                print("Empate!")
                
            break
    print("Numero de jogadas simuladas: ", profundidadeTotal)
    if(not input('Jogar de novo? (s/n) ') == 's'):
        gameLoop = False