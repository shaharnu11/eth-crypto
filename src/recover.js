import recoverPublicKey from './recover-public-key';
import addressByPublicKey from './address-by-public-key';

/**
 * returns the adress with which the messageHash was signed
 * @param  {string} sigString
 * @param  {string} hash
 * @return {string} address
 */
export default function recover(sigString, hash) {
    const pubkey = recoverPublicKey(sigString, hash);
    const address = addressByPublicKey(pubkey);
    return address;
}
