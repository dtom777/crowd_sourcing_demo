import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  BooleanInput,
  DateInput,
  required,
  SingleFieldList,
  ChipField,
  ArrayField,
  ArrayInput,
  SelectInput,
  ImageField,
  Record,
  DatagridProps,
  EditProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { categoriesList } from 'constants/categoriesList';

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
  },
  textInput: {
    width: '100%',
    maxWidth: '768px',
    '& img': {
      marginTop: '4px',
      marginLeft: '20px',
      borderRadius: '9999px',
      width: '56px',
      height: '56px',
    },
  },
});

export const PostList: FC<DatagridProps<Record>> = (props) => {
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
          label='タイトル'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <TextField
          source='content'
          label='本文'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <TextField
          source='reward'
          label='報酬額(円)'
          emptyText='無料'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <ArrayField
          source='tags'
          label='ﾊｯｼｭﾀｸﾞ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        >
          <SingleFieldList>
            <ChipField source='tag.name' />
          </SingleFieldList>
        </ArrayField>
        <TextField
          source='user.name'
          label='募集者'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <ChipField
          source='Category.name'
          label='ｶﾃｺﾞﾘｰ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <DateField
          source='createdAt'
          label='作成日'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <BooleanField
          source='published'
          label='公開'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <EditButton label='編集' />
        <DeleteButton label='削除' />
      </Datagrid>
    </List>
  );
};

export const PostEdit: FC<EditProps> = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          className={classes.textInput}
          validate={[required()]}
          disabled
        />
        <TextInput
          source='title'
          label='ﾀｲﾄﾙ'
          className={classes.textInput}
          validate={[required()]}
        />
        <TextInput
          source='content'
          label='本文'
          className={classes.textInput}
          validate={[required()]}
        />
        <TextInput
          source='reward'
          label='報酬額'
          className={classes.textInput}
          initialValue='0'
        />
        <BooleanInput
          source='rewardFree'
          label='報酬なし'
          className={classes.textInput}
          validate={[required()]}
        />
        <ArrayInput source='tags' label='ﾊｯｼｭﾀｸﾞ' className={classes.textInput}>
          <SimpleFormIterator>
            <TextInput
              source='name'
              fieldKey='id'
              label=''
              className={classes.textInput}
            />
          </SimpleFormIterator>
        </ArrayInput>
        <div className='flex'>
          <TextInput
            source='user.name'
            label='募集者'
            className={classes.textInput}
            disabled
          />
          <ImageField
            source='user.image'
            label=''
            className={classes.textInput}
          />
        </div>
        <SelectInput
          source='categoryId'
          choices={categoriesList}
          optionText='name'
          optionValue='id'
          label='ｶﾃｺﾞﾘｰ'
          className={classes.textInput}
          validate={[required()]}
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
        <BooleanInput
          source='published'
          label='公開'
          className={classes.textInput}
          validate={[required()]}
        />
        <BooleanInput
          source='draft'
          label='下書き'
          className={classes.textInput}
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
