const jwt = require('jsonwebtoken');
const axios = require('axios');
const NodeRSA = require("node-rsa");

let googleKeys = []

const getKeyById = (kid) => {
    return googleKeys.find((k) => k.kid === kid)
}

const getGooglePublicKey = async (kid) => {
    let key = getKeyById(kid)

    if (!key) {
        const url = new URL(process.env.ENDPOINT_URL)
        url.pathname = "/oauth2/v3/certs"

        const data = await axios(url.toString())
            .then((res) => res.data)
        googleKeys = data.keys

        if (googleKeys) {
            key = getKeyById(kid)
        }
    }

    if (!key) {
        throw new Error(`Google public key with id ${kid} not found`)
    }

    const pubKey = new NodeRSA()
    pubKey.importKey({ n: Buffer.from(key.n, "base64"), e: Buffer.from(key.e, "base64") }, "components-public")

    const googlePublicKey = pubKey.exportKey(["public"])
    return googlePublicKey
}

exports.verifyIdToken = async (idToken, clientId) => {
    const decodedToken = jwt.decode(idToken, { complete: true })

    const googlePublicKey = await getGooglePublicKey(decodedToken.header.kid)
    const jwtClaims = jwt.verify(idToken, googlePublicKey, { algorithms: "RS256" })

    if (jwtClaims.iss !== process.env.TOKEN_ISSUER) {
        throw new Error(
            `id token not issued by correct OpenID provider - expected: ${process.env.TOKEN_ISSUER} | from: ${jwtClaims.iss}`,
        )
    }
    if (clientId !== undefined && jwtClaims.aud !== clientId) {
        throw new Error(`aud parameter does not include this client - is: ${jwtClaims.aud}| expected: ${clientId}`)
    }
    if (jwtClaims.exp < Date.now() / 1000) {
        throw new Error("id token has expired")
    }

    return jwtClaims
}