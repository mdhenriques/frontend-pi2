export interface Mission {
    id: number;
    title: string;
    description: string;
    qtdTarefas: number;    
    coinsReward: number;
    xpReward: number;
    currentProgress: number;
    isConcluida: boolean;
}