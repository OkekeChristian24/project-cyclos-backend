
const { getShippingAddressByOrderUniqueId } = require("../../otherServices/orderShippings.service");
const verifyMessage = require("../../web3/verifyMessage");

module.exports = {
    getOrderItems: (req, res) => {},
    getOrderItemById: (req, res) => {},
    getShippingAddressByOrderUniqueId: (req, res) => {
        const orderUID = req.params.id;
        const message = req.body.message;
        const signature = req.body.signature
        const signer = req.params.address;
        if(!verifyMessage(message, signer, signature)){
            return res.status(400).json({
                success: 0,
                message: 'Error signing'
            });
        }

        getShippingAddressByOrderUniqueId(orderUID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Database query error'
                });
            }
            if (!results) {
                return res.status(502).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateOrderItem: (req, res) => {},
    deleteOrderItem: (req, res) => {}
};