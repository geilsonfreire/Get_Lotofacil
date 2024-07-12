import { Router, Request, Response, NextFunction } from 'express';
import { fetchAndSaveAllLotofacilData } from '../controllers/controller';

const router = Router();

// Middleware para lidar com erros assíncronos
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// Rota GET para buscar e salvar todos os dados da Lotofácil
router.get('/fetch-and-save-lotofacil', asyncHandler(async (req: Request, res: Response) => {
    await fetchAndSaveAllLotofacilData();
    res.status(200).send('Dados da Lotofácil buscados e salvos com sucesso!');
}));

// Rota POST para iniciar o processo de buscar e salvar os dados da Lotofácil
router.post('/fetch-data', asyncHandler(async (req: Request, res: Response) => {
    await fetchAndSaveAllLotofacilData();
    res.status(200).send('Dados da Lotofácil buscados e salvos com sucesso!');
}));

export default router;
