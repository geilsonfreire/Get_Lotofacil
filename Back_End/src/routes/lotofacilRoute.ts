import { Router } from 'express';
import { fetchAndSaveAllLotofacilData } from '../controllers/controller';

const router = Router();

// Defina a rota que chamará a função
router.get('/fetch-and-save-lotofacil', fetchAndSaveAllLotofacilData);

// Rota para iniciar o processo de buscar e salvar os dados da Lotofácil
router.post('/fetch-data', fetchAndSaveAllLotofacilData);



export default router;
