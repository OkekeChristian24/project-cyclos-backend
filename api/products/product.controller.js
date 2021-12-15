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
        axios.get('https://api.rainforestapi.com/request', { params })
        .then(response => {

            // print the JSON response from Rainforest API
            // console.log(JSON.stringify(response.data, 0, 2));
            return res.json({
                data: response.data
            });
        }).catch(error => {
            // catch and print the error
            console.log(error);
        })
    },
};