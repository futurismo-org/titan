import React, { useState } from 'react';

import { Text, Textarea } from 'native-base';
import { carouselGray } from '~/lib/theme';
import { postSubmission } from '~/lib/formcarry';

const TopicFlagForm = (props: any) => {
  const { topic, type, reportUser, handleClose } = props;

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
    const params = {
      url: '',
      topicTitle: topic.title,
      topicId: topic.id,
      topicType: type,
      postUserName: topic.userName,
      postUserId: topic.userId,
      reportUserName: reportUser.displayName,
      reportUserId: reportUser.id,
      reportUserShortId: reportUser.shortId,
      reportedAt: new Date(),
      ...data
    };
    postSubmission(params)
      .then(() => handleClose())
      .then(() => window.alert('報告が完了しました。')); // eslint-disable-line
  };

  return (
    <React.Fragment>
      <Textarea
        style={{ marginHorizontal: 15 }}
        bordered
        rowSpan={5}
        placeholder="テキスト"
        value={content}
        onChangeText={(text: string) => setContent(text)}
      />
      {/* <FormControl component="fieldset">
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
      </Button> */}
    </React.Fragment>
  );
};

export default TopicFlagForm;
