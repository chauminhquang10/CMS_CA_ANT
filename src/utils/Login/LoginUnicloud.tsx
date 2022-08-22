export class UrlUtils {
  public static readParams(
    url: string,
    responseMode: 'query' | 'fragment' = 'query',
  ): URLSearchParams {
    if (!url) throw new TypeError('Invalid URL');
    const parsedUrl = new URL(url, window.location.origin);
    const params = parsedUrl[responseMode === 'fragment' ? 'hash' : 'search'];
    return new URLSearchParams(params.slice(1));
  }
}

const client_id = 'unicloud-ca';

const UseUnicloudLogin = () => {
  // const { onSuccess, onFailure } = props;
  // function handleSigninSuccess(res: any) {
  //   onSuccess(res);
  // }
  const stateCode = (Math.random() + 1).toString(16).slice(2, 15);
  const urlOrigin = `https://unicloud-id.hcm.unicloud.ai/auth/realms/unicloud-id/protocol/openid-connect/auth?client_id=${client_id}&response_type=code&state=${stateCode}&re`;
  const options =
    'directories=yes,document=yes,location=yes,toolbar=yes,titlebar=yes,status=yes,menubar=yes,fullscreen=yes,centerscreen=yes,height=800,width=500,top=100,left=600';
  const signIn = async () => {
    // const win = window.open(url, args, options);
    // if (!win) return;
    // win.focus();
    // console.log('a', win.parent.location);
    // window.dispatchEvent(
    //   new MessageEvent('message', {
    //     data: { source: 'unicloud-ca', url: '' },
    //     origin: 'http://localhost:8000',
    //   }),
    // );
    if (!window) return;
    const popup = window.open(urlOrigin, '_blank', options);
    popup?.focus();
    if (!popup) return;

    popup.setTimeout(() => {
      console.log('popup', popup.document);
    }, 1000);

    // popup?.addEventListener(
    //   'mouseover',
    //   (e) => {
    //     console.log('e', e);
    //   },
    //   false,
    // );
  };

  return { signIn };
};

export default UseUnicloudLogin;
