function me(req, res) {
    res.status(200).json(req.user);

}


export default{
    me
}