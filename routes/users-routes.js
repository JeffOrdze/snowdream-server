const router = require('express').Router()
const usersControllers = require("../controllers/users-controllers")

router.route("/signup")
.post(usersControllers.signUp)

router.route("/login")
.post(usersControllers.login)

router.route("/google")
.post(usersControllers.googleLogin)

router.route("/current")
.get(usersControllers.currentUser)

router.route("/mountains")
.get(usersControllers.likedMountains)
.post(usersControllers.favoriteMountain)
.delete(usersControllers.removeMountain)


module.exports = router