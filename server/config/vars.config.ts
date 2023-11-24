export default {
    port: process.env.PORT || 3700,
    jwt: {
        jwt_secret: process.env.JWT_SECRET || "parkour",
        login_expiry: process.env.JWT_EXPIRY || "1d",
        verify_expiry: process.env.JWT_VERIFY_EXPIRY || "1d",
    },
    sharp: {
        compression_level: process.env.IMAGE_COMPRESSION_LEVEL || "80",
        image_height: process.env.IMAGE_HEIGHT || "400",
        image_width: process.env.IMAGE_WIDTH || "400",
        image_fit: process.env.IMAGE_FIT || "outside"
    },
    ik: {
        public_key: process.env.IK_PUBKEY,
        private_key: process.env.IK_PKEY,
        url: process.env.IK_ENDPOINT,
        tn_width: process.env.IK_TN_WIDTH || "50",
        tn_height: process.env.IK_TN_HEIGHT || "50",
    },
}