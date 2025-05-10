import { config } from '##/server/config/default.js';
import {
    getSignedUrlForDelete,
    getSignedUrlForDownload,
    getSignedUrlForUpload,
} from '##/server/services/file.services.js';
import { handleError } from '##/server/utility/utility.js';

/**
 * Generates a pre-signed S3 URL for deleting a file.
 * This URL allows the frontend to delete the specified file from the S3 bucket.
 */
async function handleS3FileDeleteSignedUrl(req, res) {
    const bucket = config.s3.bucket;

    const { signedURL } = await getSignedUrlForDelete(req.query.file, bucket);

    return res.json({ signedURL });
}

/**
 * Generates a pre-signed S3 URL for downloading a file.
 * This URL allows the frontend to download the specified file from the S3 bucket.
 */
async function handleS3FileDownloadSignedUrl(req, res) {
    const {
        query: { file: s3Path },
    } = req;

    const bucket = config.s3.bucket;
    const { signedURL } = await getSignedUrlForDownload(s3Path, bucket);

    return res.json({ signedURL });
}

/**
 * Generates a pre-signed S3 URL for uploading a file.
 * This URL allows the frontend to securely upload a file to the S3 bucket.
 */
async function handleS3FileUploadSignedUrl(req, res) {
    let bucket = config.s3.bucket;

    const { signedURL, filePath } = await getSignedUrlForUpload(
        req.user._id,
        req.body.fileName,
        bucket,
    );

    return res.json({ signedURL, filePath });
}

export {
    handleS3FileDownloadSignedUrl,
    handleS3FileDeleteSignedUrl,
    handleS3FileUploadSignedUrl,
}