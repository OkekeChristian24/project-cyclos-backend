const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});


module.exports = {
    getProductData: (req, res) => {
        const domain = req.body.domain ? req.body.domain : "amazon.com"
        // set up the request parameters
        const params = {
        api_key: process.env.API_KEY,
        type: "search",
        amazon_domain: domain,
        search_term: req.body.search_term,
        sort_by: "price_high_to_low"
        }

        // make the http GET request to Rainforest API
        axios.get(process.env.AMAZON_EXTERNAL_API, { params })
        .then(response => {

            // print the JSON response from Rainforest API
            // console.log(JSON.stringify(response.data, 0, 2));
            return res.status(200).json({
                data: response.data
            });
        }).catch(error => {
            console.log(error);
            // catch and print the error
            return res.status(500).json({
                message: "Server Error"
            });
        })
    },
};