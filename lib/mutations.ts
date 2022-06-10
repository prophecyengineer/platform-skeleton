import fetcher from './fetcher'

export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string; username: string  }
) => {
  return fetcher(`/${mode}`, body)
}
