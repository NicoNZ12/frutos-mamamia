import cloudinary from '../config/cloudinary'
import { UploadApiResponse } from 'cloudinary'

export const uploadToCloudinary = async (imageBuffer: Buffer, folder: string = 'productos'): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 600, crop: 'limit' },
                    { quality: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result!)
                }
            }
        ).end(imageBuffer)
    })
}
