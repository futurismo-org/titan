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
import { carouselGray } from '~/lib/theme';

const GreyRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const TopicFlagForm = (props: any) => {
  const { topic, collectionType, collectionId, handler, handleClose } = props;

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
    handler(topic, collectionType, collectionId, data)
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
          backgroundColor: carouselGray
        }}
        InputProps={{
          style: {
            color: '#fff'
          }
        }}
        FormHelperTextProps={{
          style: {
            color: '#fff'
          }
        }}
        SelectProps={{
          style: {
            color: '#fff'
          }
        }}
        InputLabelProps={{
          style: {
            color: '#fff'
          }
        }}
        onChange={onContentChange}
      />
      <br />
      <br />
      <span style={{ color: carouselGray }}>
        報告されたコンテンツについては、Titanの運営が毎日24時間体制で審査し、
        そのコンテンツを削除するか、センシティブフィルターの対象にするか、報告を却下するかを決定します。
      </span>
      <br />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{ color: carouselGray }}
        onClick={() =>
          postHandler({
            content,
            reportType
          })
        }
      >
        報告する
      </Button>
    </React.Fragment>
  );
};

export default TopicFlagForm;
