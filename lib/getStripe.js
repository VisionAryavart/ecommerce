import {loadStripe} from '@stripe/stripe-js';

let stripePromise;

const getStripe= ()=>{
    if(!stripePromise){
        stripePromise = loadStripe('pk_test_51RLzyPCMVihLOSQvZrTOwvV40RapLkiiilBYX1ZHvJZBNobsCo3floWUEW2e2wMMk4an45TPsJWNLsqAqW0O5kB300h2IM3Wby');

    }
    return stripePromise;
}
export default getStripe;