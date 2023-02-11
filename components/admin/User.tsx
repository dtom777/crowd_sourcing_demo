import useSWR from 'swr';

import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EmailField,
  ImageField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
  SelectInput,
  required,
  useNotify,
  useRefresh,
  useRedirect,
  DatagridProps,
  Record,
  EditProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { FC, useState } from 'react';

const useStyles = makeStyles({
  tableHeader: {
    padding: '6px 4px',
    maxWidth: '120px',
    fontWeight: 900,
    border: 'dashed',
    borderWidth: '1px',
    borderColor: 'rgba(209, 213, 219)',
    textAlign: 'center',
  },
  tableData: {
    padding: '6px 4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '120px',
    border: 'dashed',
    borderWidth: '1px',
    borderColor: 'rgba(209, 213, 219)',
    '& img': {
      padding: '0px',
      margin: '0px',
      borderRadius: '9999px',
      width: '40px',
      height: '40px',
    },
  },
  textInput: {
    width: '100%',
    maxWidth: '768px',
    '& img': {
      marginTop: '4px',
      marginLeft: '32px',
      borderRadius: '9999px',
      width: '56px',
      height: '56px',
    },
  },
  notify: {
    backgroundColor: 'red',
  },
});

export const UserList: FC<DatagridProps<Record>> = (props) => {
  const classes = useStyles();

  return (
    <List {...props}>
      <Datagrid rowClick='edit'>
        <TextField
          source='id'
          label='ID'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
          textAlign='right'
        />
        <ImageField
          source='image'
          label='ｱﾊﾞﾀｰ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <TextField
          source='name'
          label='ﾕｰｻﾞｰ名'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <EmailField
          source='email'
          label='Email'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <TextField
          source='profile'
          label='自己紹介文'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        {/* <TextField
          source="password"
          label="ﾊﾟｽﾜｰﾄﾞ"
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        /> */}

        <BooleanField
          source='active'
          label='有効なﾕｰｻﾞｰ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <TextField
          source='role'
          label='管理権限'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <DateField
          source='createdAt'
          label='作成日'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <EditButton label='編集' />
        <DeleteButton label='削除' />
      </Datagrid>
    </List>
  );
};

export const UserEdit: FC<EditProps> = (props) => {
  const classes = useStyles();

  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = (): void => {
    notify('変更が完了しました。');
    redirect('/users');
    refresh();
  };

  const onFailure = (error: { message: string }): void => {
    notify(`${error.message}`, 'warning');
    redirect('/users');
    refresh();
  };

  const [img, setImg] = useState<string>('');

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
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Edit
      onSuccess={onSuccess}
      onFailure={onFailure}
      mutationMode='pessimistic'
      {...props}
    >
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          className={classes.textInput}
          validate={[required()]}
          disabled
        />
        {/* updateできるようにする */}
        <div className='flex'>
          <SelectInput
            source='image'
            choices={avatarImageList}
            optionText='name'
            optionValue='url'
            label='ｱﾊﾞﾀｰ'
            className={classes.textInput}
            validate={[required()]}
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
          {img ? (
            <img src={img} className='w-14 h-14 rounded-full ml-8 mt-1' />
          ) : (
            <ImageField source='image' className={classes.textInput} />
          )}
        </div>
        <TextInput
          source='name'
          label='ﾕｰｻﾞｰ名'
          className={classes.textInput}
          validate={[required()]}
        />
        <TextInput
          source='email'
          label='Email'
          className={classes.textInput}
          validate={[required()]}
        />
        <TextInput
          source='profile'
          label='自己紹介文'
          className={classes.textInput}
        />
        <BooleanInput
          source='active'
          label='有効なﾕｰｻﾞｰ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <DateInput
          source='createdAt'
          label='作成日'
          className={classes.textInput}
          validate={[required()]}
        />
        <DateInput
          source='updatedAt'
          label='更新日'
          className={classes.textInput}
        />
        <TextInput
          source='twitter'
          label='twitter'
          className={classes.textInput}
        />
        <TextInput
          source='facebook'
          label='facebook'
          className={classes.textInput}
        />
        {data.role === 'masterAdmin' && (
          <SelectInput
            source='role'
            choices={role}
            optionText='name'
            optionValue='name'
            label='管理権限'
            className={classes.textInput}
            validate={[required()]}
          />
        )}
      </SimpleForm>
    </Edit>
  );
};

const avatarImageList = [
  { id: 1, url: '/avatar-1.jpg', name: 'ねこ１' },
  { id: 2, url: '/avatar-2.jpg', name: 'ねこ２' },
  { id: 3, url: '/avatar-3.jpg', name: 'きつね１' },
  { id: 4, url: '/avatar-4.jpg', name: 'うさぎ' },
  { id: 5, url: '/avatar-5.png', name: 'きつね２' },
];

const role = [
  { id: 1, name: 'masterAdmin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'normal' },
];
