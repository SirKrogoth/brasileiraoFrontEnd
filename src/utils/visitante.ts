import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function visitante<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookie = parseCookies(ctx);

        if(cookie['@brasileiraoauth.token']){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        
        return await fn(ctx);
    }
}