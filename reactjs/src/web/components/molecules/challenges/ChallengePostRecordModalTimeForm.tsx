import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const ChallengePostRecordModalTimeForm = (props: any) => {
  const { closeHandler, postHandler, data } = props;

  const [time, setTime] = useState('00:05');

  const time2Minutes = (time: string) => {
    const a = time.split(':');
    return +a[0] * 60 + +a[1];
  };

  const onTimeChange = (e: any) => {
    e.preventDefault();
    setTime(e.target.value);
  };

  return (
    <React.Fragment>
      <h2 id="simple-modal-title">時間の入力</h2>
      <TextField
        id="time"
        value={time}
        label="実施時間"
        type="time"
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
        onChange={onTimeChange}
      />
      <div style={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={() => closeHandler()}>
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: 10, fontWeight: 'bold' }}
          color="primary"
          onClick={() => postHandler({ ...data, minutes: time2Minutes(time) })}
        >
          記録
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ChallengePostRecordModalTimeForm;
