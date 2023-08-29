import { Router } from 'express'
import { list } from '../controllers/users'

const router = Router()

router.get('/', list)

// router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show)

// router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit)

// router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy)

export default router