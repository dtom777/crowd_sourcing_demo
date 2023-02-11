import { Admin, Resource, fetchUtils, AppBar, Layout } from 'react-admin';
import { PostList, PostEdit } from './Post';
import { UserList, UserEdit } from './User';
import { CategoryList, CategoryEdit } from './Category';
import { EventList, EventEdit } from './Event';
import simpleRestProvider from 'ra-data-simple-rest';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../atoms/loading/Loading';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
});

const MyAppBar = (props) => {
  const classes = useStyles();

  const fetcher = async (url: RequestInfo) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = res.json();
      // error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data } = useSWR('/api/session/getSession', fetcher);
  if (!data) return <div>loading...</div>;

  return (
    <AppBar {...props} userMenu={false}>
      <Typography
        variant='h6'
        color='inherit'
        className={classes.title}
        id='react-admin-title'
      />
      <span className={classes.spacer} />
      <div className='flex items-center mr-2'>
        <Image
          className='rounded-full'
          src={data.image}
          width={30}
          height={30}
          alt='avatar-image'
        />
      </div>
      <div className='mr-4'>
        <Typography variant='h6' color='inherit' id='react-admin-title'>
          {data.name}
        </Typography>
      </div>
      <Button
        color='inherit'
        variant='outlined'
        onClick={() => signOut({ callbackUrl: '/admin/signin' })}
      >
        logout
      </Button>
    </AppBar>
  );
};

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

const fetchJson = (url, options = {}) => {
  // @ts-ignore
  if (!options.headers) {
    // @ts-ignore
    options.headers = new Headers({
      Accept: 'application/json',
    });
  }
  // @ts-ignore
  options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');

  return fetchUtils.fetchJson(url, options);
};

const ReactAdmin = () => {
  const router = useRouter();

  const fetcher = async (url: RequestInfo) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = res.json();
      // error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR('/api/session/getSession', fetcher);
  if (error)
    return (
      <div className='text-center'>
        <div className='mb-4'>許可されていません</div>
        <Link href='/admin/signin'>
          <a className='border py-2 px-4'>管理者ログイン</a>
        </Link>
      </div>
    );
  if (!data) return <Loading loading={true} />;
  if (data.role !== 'admin' && data.role !== 'masterAdmin') {
    router.push('/admin/signin');

    return null;
  }

  return (
    <>
      <Admin
        dataProvider={simpleRestProvider(
          '/api/admin',
          fetchJson,
          'X-Total-Count'
        )}
        layout={MyLayout}
      >
        <Resource name='users' list={UserList} edit={UserEdit} />
        <Resource name='posts' list={PostList} edit={PostEdit} />
        <Resource name='categories' list={CategoryList} edit={CategoryEdit} />
        <Resource name='events' list={EventList} edit={EventEdit} />
      </Admin>
    </>
  );
};
export default ReactAdmin;
