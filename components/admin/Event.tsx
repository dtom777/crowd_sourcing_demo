import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useNotify,
  useRefresh,
  useRedirect,
  DatagridProps,
  Record,
  EditProps,
} from 'react-admin';
import { RgbaStringColorPicker } from 'react-colorful';
import { makeStyles } from '@material-ui/core';
import { useState, FC } from 'react';

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
  tableDataCenter: {
    padding: '6px 4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '120px',
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

export const EventList: FC<DatagridProps<Record>> = (props) => {
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
        <TextField
          source='title'
          label='ﾀｲﾄﾙ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <DateField
          source='createdAt'
          label='作成日'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableDataCenter}
        />
        <EditButton label='編集' />
        <DeleteButton label='削除' />
      </Datagrid>
    </List>
  );
};

export const EventEdit: FC<EditProps> = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState<string>('rgb(0,0,0)');

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
          textAlign='right'
          disabled
          validate={[required()]}
        />
        <TextInput
          source='title'
          label='ﾀｲﾄﾙ'
          className={classes.textInput}
          validate={[required()]}
        />
        <TextInput
          source='subTitle'
          label='ｻﾌﾞﾀｲﾄﾙ'
          className={classes.textInput}
        />
        <TextInput
          source='formTitle'
          label='投稿ﾌｫｰﾑﾀｲﾄﾙ'
          className={classes.textInput}
        />
        <TextInput
          source='formSubTitle'
          label='投稿ﾌｫｰﾑｻﾌﾞﾀｲﾄﾙ'
          className={classes.textInput}
        />
        <TextInput
          source='description'
          label='概要'
          className={classes.textInput}
        />
        <TextInput
          source='comment'
          label='ｺﾒﾝﾄ'
          className={classes.textInput}
        />
        <div className='flex mb-2'>
          <h3 className='mr-2'>ｶﾗｰｻﾝﾌﾟﾙ</h3>
          <input
            type='text'
            placeholder='rgb(0,0,0)'
            className='border rounded-md pl-1'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <RgbaStringColorPicker color={color} onChange={setColor} />
        <TextInput
          source='color'
          label='ﾃｰﾏｶﾗｰ'
          className={classes.textInput}
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
      </SimpleForm>
    </Edit>
  );
};
