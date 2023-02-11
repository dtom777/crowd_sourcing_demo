import { useState, useEffect, memo, useCallback, VFC } from 'react';
import { Session } from 'next-auth';
import LikeButton from '@/components/atoms/button/LikeButton';
import { useFetch } from '@/hooks/useFetch';
import { errorToast } from '@/lib/toast';

type Props = {
  session: Session;
  id: string;
};

const ToggleLikeButton: VFC<Props> = ({ session, id }) => {
  const [like, setLike] = useState<boolean>(false);
  const buttonTitle: string = like ? 'いいね済' : 'いいね！';

  const handleLike = useCallback(async (): Promise<void> => {
    const body: { like: boolean; postId: string; userId: string } = {
      like: !like,
      postId: id,
      userId: session.user.id,
    };
    setLike(body.like);

    try {
      await fetch('/api/like/createLike', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      errorToast(error.message);
    }
  }, [id, like, session.user.id]);

  const { data } = useFetch(session ? `/api/like/getLike?postId=${id}` : null);

  useEffect((): void => {
    if (!session || !data) {
      return;
    }
    data.length !== 0 ? setLike(true) : setLike(false);
  }, [data, session]);

  return (
    <>
      <LikeButton handler={handleLike} like={like}>
        {buttonTitle}
      </LikeButton>
    </>
  );
};

export default memo(ToggleLikeButton);
