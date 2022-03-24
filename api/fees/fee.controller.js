const { getFees, getFeesByCompany } = require("./fee.service");

module.exports = {
    getFees: (req, res) => {
        getFees((err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Item query error'
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
    getFeesByCompany: (req, res) => {
        getFeesByCompany(req.params.company, (err, results) => {
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
    }
};