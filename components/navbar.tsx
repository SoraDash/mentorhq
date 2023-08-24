import MobileSidebar from './mobile-sidebar';

export const NavBar = async () => {

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className='flex justify-end w-full'>
        {/* <UserButton afterSignOutUrl='/' /> */}
      </div>
    </div>
  );
}