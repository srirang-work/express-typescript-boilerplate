import express from 'express'
import {home} from '@/controllers/home-controller'
import { createPost } from '@/controllers/post-controller'
import { initiateWallet } from '@/controllers/wallet-controllet'


const router = express.Router()

router.get('/', home)

router.post('/post', createPost)

router.post('/wallet', initiateWallet)

export default (app: express.Application) => app.use(router)
