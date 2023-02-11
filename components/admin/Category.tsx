import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  DatagridProps,
  Record,
  EditProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles({
  tableHeader: {
    padding: '6px 4px',
    maxWidth: '500px',
    fontWeight: 900,
    border: 'dashed',
    borderWidth: '1px',
    borderColor: 'rgba(209, 213, 219)',
    textAlign: 'center',
    tableLayout: 'fixed',
    width: '20%',
  },
  tableDataCenter: {
    padding: '6px 4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '500px',
    border: 'dashed',
    borderWidth: '1px',
    borderColor: 'rgba(209, 213, 219)',
    textAlign: 'center',
    tableLayout: 'fixed',
    width: '20%',
  },
  tableData: {
    padding: '6px 4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '500px',
    border: 'dashed',
    borderWidth: '1px',
    borderColor: 'rgba(209, 213, 219)',
    tableLayout: 'fixed',
    width: '20%',
  },
  textInput: {
    width: '100%',
    maxWidth: '768px',
  },
});

export const CategoryList: FC<DatagridProps<Record>> = (props) => {
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
          source='name'
          label='ｶﾃｺﾞﾘｰ'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <NumberField
          source='posts.length'
          label='募集数'
          headerClassName={classes.tableHeader}
          cellClassName={classes.tableData}
        />
        <EditButton label='編集' />
        <DeleteButton label='削除' />
      </Datagrid>
    </List>
  );
};

export const CategoryEdit: FC<EditProps> = (props) => {
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
          source='name'
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
      </SimpleForm>
    </Edit>
  );
};
