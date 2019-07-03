import React from 'react';
import Node2FA from 'node-2fa';

type Props = {
  token: [string, string];
};

const TokenItem = (props: Props) => {
  const { token } = props;
  const [name, tokenSecret] = token;

  // State of time
  const [time, setTime] = React.useState(new Date().getSeconds());
  const [tick, setTick] = React.useState(true);

  // Calculate TOTP
  const hash = React.useMemo(() => {
    return Node2FA.generateToken(tokenSecret);
  }, [tokenSecret, tick]);

  // Check time for each 30s
  const updateTime = React.useCallback(() => {
    const time = new Date().getSeconds();
    if (time === 0 || time === 30) {
      setTick(!tick);
    }
    setTime(time >= 30 ? time - 30 : time);
  }, [time, setTime, tick, setTick]);

  // setTime
  React.useEffect(() => {
    const curDate = new Date();
    const timeout = setTimeout(updateTime, 1000 - (curDate.getTime() % 1000));
    return () => clearInterval(timeout);
  }, [time, updateTime]);

  return (
    <div>
      <div>{name}</div>
      <div>{hash.token}</div>
      <div>{time}</div>
    </div>
  );
};

export default TokenItem;
