import React, { useState } from 'react';

import {
  TextField,
  Button,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { brandGray, brandWhite } from '~/lib/theme';

const GreyRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const FlagForm = (props: any) => {
  const {
    topic,
    challenge,
    category,
    profile,
    note,
    collectionType,
    collectionId,
    handler,
    handleClose
  } = props;

  const [content, setContent] = useState('');
  const [reportType, setReportType] = useState('');

  const onContentChange = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onReportTypeChange = (e: any) => {
    e.preventDefault();
    setReportType(e.target.value);
  };

  const postHandler = (data: any) => {
    handler(
      topic,
      challenge,
      category,
      profile,
      note,
      collectionType,
      collectionId,
      data
    )
      .then(() => handleClose())
      .then(() => window.alert('報告が完了しました。')); // eslint-disable-line
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="問題の種類"
          name="showmode"
          value={reportType}
          onChange={onReportTypeChange}
        >
          <FormControlLabel
            value="性的なコンテンツ"
            control={<GreyRadio />}
            label="性的なコンテンツ"
          />
          <FormControlLabel
            value="暴力的または不快なコンテンツ"
            control={<GreyRadio />}
            label="暴力的または不快なコンテンツ"
          />
          <FormControlLabel
            value="差別的または攻撃的なコンテンツ"
            control={<GreyRadio />}
            label="差別的または攻撃的なコンテンツ"
          />
          <FormControlLabel
            value="スパムの可能性のあるコンテンツ"
            control={<GreyRadio />}
            label="スパムの可能性のあるコンテンツ"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        value={content}
        variant="outlined"
        margin="normal"
        required
        id="content"
        label="問題の内容"
        fullWidth
        multiline
        rows={8}
        style={{
          backgroundColor: brandGray
        }}
        InputProps={{
          style: {
            color: brandWhite
          }
        }}
        FormHelperTextProps={{
          style: {
            color: brandWhite
          }
        }}
        SelectProps={{
          style: {
            color: brandWhite
          }
        }}
        InputLabelProps={{
          style: {
            color: brandWhite
          }
        }}
        onChange={onContentChange}
      />
      <br />
      <br />
      <span style={{ color: brandGray }}>
        報告されたコンテンツについては、Titanの運営が毎日24時間体制で審査し、
        そのコンテンツを削除するか、センシティブフィルターの対象にするか、報告を却下するかを決定します。
      </span>
      <br />
      <br />
      <div style={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={() => handleClose()}>
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: 10 }}
          onClick={() =>
            postHandler({
              content,
              reportType
            })
          }
        >
          報告する
        </Button>
      </div>
    </React.Fragment>
  );
};

export default FlagForm;
