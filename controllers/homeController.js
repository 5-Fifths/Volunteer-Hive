// homeController.js
// Directs traffic to the dashboard

// Initialization
const ROOT_DIR = process.env.ROOT_DIR;

// All requests should refer to this
const getPage = (req, res) => {
    res.sendFile("/webpage/dashboard.html", { root: ROOT_DIR });
};

module.exports = { getPage };