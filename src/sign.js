import * as secp256k1 from 'secp256k1';
import * as util from './util';

/**
 * signs the given message
 * we do not use sign from eth-lib because the pure secp256k1-version is 90% faster
 * @param  {string} privateKey
 * @param  {string} hash
 * @return {string} hexString
 */
export default function sign(privateKey, hash) {
    hash = util.addTrailing0x(hash);
    if (hash.length !== 66)
        throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);

    const sigObj = secp256k1.sign(
        new Buffer(util.removeTrailing0x(hash), 'hex'),
        new Buffer(util.removeTrailing0x(privateKey), 'hex')
    );

    const recoveryId = sigObj.recovery === 1 ? '1c' : '1b';

    const newSignature = '0x' + sigObj.signature.toString('hex') + recoveryId;
    return newSignature;
}
