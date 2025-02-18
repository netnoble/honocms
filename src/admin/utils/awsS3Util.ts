// src/admin/utils/awsS3Util.ts
import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

export default class AwsS3Util {
    private S3: S3Client;

    constructor(accountId: string, accessKeyId: string, secretAccessKey: string) {
        this.S3 = new S3Client({
            region: "auto",
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }

    async listBuckets() {
        const command = new ListBucketsCommand({});
        const response = await this.S3.send(command);
        return response.Buckets;
    }

    async listObjects(bucketName: string) {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
        });
        const response = await this.S3.send(command);
        return response.Contents;
    }

    async getObject(bucketName: string, objectKey: string) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });
        const response = await this.S3.send(command);
        return response;
    }

    async putObject(bucketName: string, objectKey: string, body: string) {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            Body: body,
        });
        const response = await this.S3.send(command);
        return response;
    }
}