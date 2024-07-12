import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface LotofacilAttributes {
    loteria: string;
    concurso: number;
    data: string;
    local: string;
    dezenasOrdemSorteio: string[];
    dezenas: string[];
    trevos: string[];
    timeCoracao: string | null;
    mesSorte: string | null;
    premiacoes: any[];
    estadosPremiados: any[];
    observacao: string;
    acumulou: boolean;
    proximoConcurso: number;
    dataProximoConcurso: string;
    localGanhadores: any[];
    valorArrecadado: number;
    valorAcumuladoConcurso_0_5: number;
    valorAcumuladoConcursoEspecial: number;
    valorAcumuladoProximoConcurso: number;
    valorEstimadoProximoConcurso: number;
}

interface LotofacilCreationAttributes extends Optional<LotofacilAttributes, 'concurso'> { }

class Lotofacil extends Model<LotofacilAttributes, LotofacilCreationAttributes> {
    public loteria!: string;
    public concurso!: number;
    public data!: string;
    public local!: string;
    public dezenasOrdemSorteio!: string[];
    public dezenas!: string[];
    public trevos!: string[];
    public timeCoracao!: string | null;
    public mesSorte!: string | null;
    public premiacoes!: any[];
    public estadosPremiados!: any[];
    public observacao!: string;
    public acumulou!: boolean;
    public proximoConcurso!: number;
    public dataProximoConcurso!: string;
    public localGanhadores!: any[];
    public valorArrecadado!: number;
    public valorAcumuladoConcurso_0_5!: number;
    public valorAcumuladoConcursoEspecial!: number;
    public valorAcumuladoProximoConcurso!: number;
    public valorEstimadoProximoConcurso!: number;

    // Campos padrão do Sequelize (timestamps)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Inicialização do modelo
    static initModel(sequelize: any): void {
        Lotofacil.init({
            loteria: DataTypes.STRING,
            concurso: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            data: DataTypes.STRING,
            local: DataTypes.STRING,
            dezenasOrdemSorteio: DataTypes.JSON,
            dezenas: DataTypes.JSON,
            trevos: DataTypes.JSON,
            timeCoracao: DataTypes.STRING,
            mesSorte: DataTypes.STRING,
            premiacoes: DataTypes.JSON,
            estadosPremiados: DataTypes.JSON,
            observacao: DataTypes.STRING,
            acumulou: DataTypes.BOOLEAN,
            proximoConcurso: DataTypes.INTEGER,
            dataProximoConcurso: DataTypes.STRING,
            localGanhadores: DataTypes.JSON,
            valorArrecadado: DataTypes.FLOAT,
            valorAcumuladoConcurso_0_5: DataTypes.FLOAT,
            valorAcumuladoConcursoEspecial: DataTypes.FLOAT,
            valorAcumuladoProximoConcurso: DataTypes.FLOAT,
            valorEstimadoProximoConcurso: DataTypes.FLOAT,
        }, {
            sequelize,
            modelName: 'Lotofacil',
            timestamps: false,
        });
    }

    // Método para encontrar o último sorteio
    public static async findLatestDraw(): Promise<Lotofacil | null> {
        try {
            const latestDraw = await Lotofacil.findOne({
                order: [['concurso', 'DESC']], // Ordena pelo número do concurso em ordem decrescente para obter o último sorteio
            });
            return latestDraw;
        } catch (error) {
            console.error('Erro ao buscar último sorteio da Lotofácil:', error);
            return null;
        }
    }
}

// Inicializa o modelo Lotofacil
Lotofacil.initModel(sequelize);

export default Lotofacil;


