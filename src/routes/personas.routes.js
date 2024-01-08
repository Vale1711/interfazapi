import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {id, nombre, apellido, numero} = req.body;
        const newPersona = {
            id, nombre, apellido, numero
        }
        await pool.query('INSERT INTO datos SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


router.get('/list', async(req, res)=>{
    try{
        
        const [result] = await pool.query('SELECT * FROM datos');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('SELECT * FROM datos WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {nombre, apellido, numero} = req.body;
        const {id} = req.params;
        const editPersona = {nombre, apellido, numero};
        await pool.query('UPDATE datos SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM datos WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;