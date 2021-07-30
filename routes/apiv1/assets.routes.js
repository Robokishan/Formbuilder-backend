var router = require('express').Router();
var assetController = require('../../controllers/v1/assets.controller');

router.get('/',                 assetController.listAssets)
router.delete('/:assetId',assetController.deleteAsset);
router.put('/:assetId', assetController.editAsset);
router.get('/:assetId', assetController.getAsset);
/**
 * @swagger 
 * /api/v1/asset/data/{assetId}: 
 *  get: 
 *      tags:
 *       - "Asset"  
 *      description: Get data in given time range of {assetId} if not given then return 24 hour data
 *      parameters:
 *      - in: path
 *        name: assetId
 *        required: true
 *        type: string
 *      - in: query
 *        name: lte
 *        type: integer
 *      - in: query
 *        name: gte
 *        type: integer
 *      - in: query
 *        name: limit
 *        type: integer
 *      - in: query
 *        name: page
 *        type: integer
 *      produces:
 *       - application/json
 *      consumes:
 *       - application/json
 *      responses:
 *          200:
 *              description: OK
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: "Forbidden"
 *          404:
 *              description: "Not Found"
 *      security:
 *        - authorization: []
 */
// router.get('/data/:assetId',         assetController.getData)


/**
 * @swagger 
 * /api/v1/asset/overview:
 *  get: 
 *      tags:
 *       - "Asset"  
 *      description: Get all asset's single last data point for current user
 *      produces:
 *       - application/json
 *      consumes:
 *       - application/json
 *      responses:
 *          200:
 *              description: OK
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: "Forbidden"
 *          404:
 *              description: "Not Found"
 *      security:
 *        - authorization: []
 */
// router.get('/overview', assetController.getOverview)


/**
 * @swagger 
 * /api/v1/asset/add: 
 *  post: 
 *      tags:
 *       - "Asset"  
 *      description: Add {asset_username} asset in current user's account 
 *      produces:
 *       - application/json
 *      consumes:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: body
 *         required: false
 *         schema:
 *           type: "object"
 *           properties:
 *             asset_username:
 *               required: true
 *               type: "string"
 *      responses:
 *          200:
 *              description: OK
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: "Forbidden"
 *          404:
 *              description: "Not Found"
 *      security:
 *        - authorization: []
 */
router.post('/add', assetController.addAsset);


/**
 * @swagger
 * /api/v1/asset/detail/{assetId}:
 *  put:
 *      tags:
 *       - "Asset"
 *      description: Update asset details
 *      summary: update details of assets
 *      produces:
 *       - application/json
 *      parameters:
 *       - in: path
 *         name: assetId
 *         required: true
 *         type: "string"
 *         description: Asset id 
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             asset_name:
 *               required: true
 *               type: "string"
 *             bookmark:
 *               required: true
 *               type: "object"
 *             address:
 *               required: true
 *               type: "object"
 *             assetType:
 *               required: true
 *               type: "string"
 *      responses:
 *          200:
 *              description: OK
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: "Forbidden"
 *          404:
 *              description: "Not Found"
 *      security:
 *        - authorization: []
 */
// router.put('/detail/:assetId',assetController.updateDetail);
module.exports = router;