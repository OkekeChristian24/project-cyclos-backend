

const notifyUserWithMailchimp = (userEmail, subject, message) => {
    const mcData = {
        members: [
            {
                email_address: userEmail,
                status: "subscribed"
            }
        ]
    };

    const mcDataPost = JSON.stringify(mcData);

    const options = {
        url: "",
        method: "POST",
        headers: {
            Authorization: "auth <MC_API_KEY>"
        },
        body: mcDataPost
    }
};


export default notifyUserWithMailchimp;