import LikeService from '../servies/like-service.js';

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelId, req.body.userId);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully toggle like'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: error,
        })
    }
}