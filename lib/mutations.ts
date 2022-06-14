import fetcher from './fetcher'


// change over for signin as just username and pass
export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string; username: string  }
) => {
  return fetcher(`/${mode}`, body)
}
