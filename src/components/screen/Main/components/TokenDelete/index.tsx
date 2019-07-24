import './styles.css';

import React from 'react';
import { Button } from '../../../../atoms/Styled';
import { useSecretCollection } from '../../../../../utils/react-support/Hook';

type Props = {
  service?: string;
  name?: string;
  onCancel?: () => void;
  onWillDelete?: () => void;
  onDeleted?: () => void;
};

const TokenAlert = (props: Props) => {
  const { service, name, onCancel, onWillDelete, onDeleted } = props;
  const title = React.useMemo(
    () =>
      !!service ? `${service}을(를) 삭제하시겠습니까?` : '삭제하시겠습니까?',
    [service]
  );

  const collection = useSecretCollection();
  const onClickSubmit = React.useCallback(() => {
    // Before Delete
    if (!!onWillDelete) {
      onWillDelete();
    }

    return collection
      .where('service', '==', service)
      .where('name', '==', name)
      .get()
      .then((snap) => {
        snap.docs.forEach((it) => it.ref.delete());
      })
      .finally(() => {
        // After Delete
        if (!!onDeleted) {
          onDeleted();
        }
      });
  }, [onWillDelete, onDeleted]);
  const onClickCancel = React.useCallback(() => !!onCancel && onCancel(), [
    onCancel
  ]);

  return (
    <div className='delete-dialog'>
      <div className='title'>{title}</div>
      <div className='button-section'>
        <Button className='negative' onClick={onClickCancel}>
          취소
        </Button>
        <Button className='positive' onClick={onClickSubmit}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default TokenAlert;
