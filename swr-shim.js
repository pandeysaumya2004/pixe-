// swr-shim.js
import * as swr from 'swr';
import useSWRInfinite from 'swr/infinite';

export default swr.default || swr.useSWR;
export const useSWRMutation = swr.useSWRMutation;
export { useSWRInfinite };
export * from 'swr';
