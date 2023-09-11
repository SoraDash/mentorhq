'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { useToast } from './ui/use-toast'
import { Button } from '@nextui-org/react'
import { Icons } from './Icons'
import { FaGithub } from 'react-icons/fa'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Github',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col space-y-5 justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        {isLoading ? 'Please wait...' : 'Google'}
      </Button>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGithub}
        disabled={isLoading}>
        {isLoading ? null : <FaGithub className='h-4 w-4 mr-2' />}
        {isLoading ? 'Please wait...' : 'Github'}
      </Button>
    </div>
  )
}

export default UserAuthForm