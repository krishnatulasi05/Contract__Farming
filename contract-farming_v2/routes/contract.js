const express = require('express');
const mongoose = require('mongoose');
const Contract = require('../models/Contract');
const router = express.Router();
const auth = require('../middleware/auth');

// @route POST /api/contract
// @desc Create a new contract
// @access Private
router.post('/', auth, async (req, res) => {
    try {
        const { crop, quantity, price, comments, negotiation } = req.body;
        const farmerId = req.user.id;

        const newContract = new Contract({
            farmer: farmerId,
            crop,
            quantity,
            price,
            comments,
            negotiation,
            paymentStatus: 'unpaid',
            status: 'pending'
        });

        await newContract.save();
        res.status(201).json(newContract);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route GET /api/contracts
// @desc Get all contracts for the logged-in user (farmer)
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const contracts = await Contract.find({ farmer: req.user.id })
            .populate('farmer', 'name');

        res.json(contracts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route PATCH /api/contracts/:id
// @desc Update a contract's status
// @access Private
router.patch('/:id', auth, async (req, res) => {
    const { status } = req.body;

    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ msg: 'Contract not found' });
        }

        if (contract.farmer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        contract.status = status;
        await contract.save();

        res.json(contract);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
